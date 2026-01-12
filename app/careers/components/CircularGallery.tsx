"use client";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

import './CircularGallery.css';

type GL = Renderer['gl'];

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
    let timeout: number;
    return function (this: any, ...args: Parameters<T>) {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => func.apply(this, args), wait);
    };
}

function lerp(p1: number, p2: number, t: number): number {
    return p1 + (p2 - p1) * t;
}

function autoBind(instance: any): void {
    const proto = Object.getPrototypeOf(instance);
    Object.getOwnPropertyNames(proto).forEach(key => {
        if (key !== 'constructor' && typeof instance[key] === 'function') {
            instance[key] = instance[key].bind(instance);
        }
    });
}

function wrapText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, currentY);
}

function createCardTexture(
    gl: GL,
    id: string,
    title: string,
    subtext: string,
    cardColor: string = '#1a1a1a',
    textColor: string = 'white'
): { texture: Texture; width: number; height: number } {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2d context');

    // Higher resolution for better text quality
    const width = 800;
    const height = 1000;
    canvas.width = width;
    canvas.height = height;

    // Background
    context.fillStyle = cardColor;
    context.fillRect(0, 0, width, height);

    // Title
    context.font = '800 64px sans-serif';
    context.fillStyle = textColor;
    context.textAlign = 'left';
    wrapText(context, title, 60, 180, width - 120, 75);

    // Subtext
    context.font = '500 32px sans-serif';
    context.fillStyle = textColor;
    wrapText(context, subtext, 60, height - 550, width - 120, 45);

    const texture = new Texture(gl, { generateMipmaps: true });
    texture.image = canvas;
    return { texture, width, height };
}

function createLabelTexture(gl: GL, text: string): { texture: Texture; width: number; height: number } {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2d context');

    // Higher resolution for label
    canvas.width = 200;
    canvas.height = 100;

    context.font = '700 48px sans-serif';
    context.fillStyle = '#5ce1e6';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, 100, 50);

    const texture = new Texture(gl, { generateMipmaps: true });
    texture.image = canvas;
    return { texture, width: 200, height: 100 };
}

class Label {
    gl: GL;
    plane: Mesh;
    text: string;
    mesh!: Mesh;

    constructor(gl: GL, plane: Mesh, text: string) {
        this.gl = gl;
        this.plane = plane;
        this.text = text;
        this.createMesh();
    }

    createMesh() {
        const { texture } = createLabelTexture(this.gl, this.text);
        const geometry = new Plane(this.gl);
        const program = new Program(this.gl, {
            vertex: `
                attribute vec3 position;
                attribute vec2 uv;
                uniform mat4 modelViewMatrix;
                uniform mat4 projectionMatrix;
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragment: `
                precision highp float;
                uniform sampler2D tMap;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tMap, vUv);
                    if (color.a < 0.05) discard;
                    gl_FragColor = color;
                }
            `,
            uniforms: { tMap: { value: texture } },
            transparent: true
        });
        this.mesh = new Mesh(this.gl, { geometry, program });
        this.mesh.setParent(this.plane);

        // Scale relative to parent card
        // Card is roughly scaled to 1.0 in its own local space before parent scale
        this.mesh.scale.set(0.25, 0.125, 1);
        // Position below bottom edge (-0.5 is bottom edge)
        this.mesh.position.set(0, -0.65, 0.01);
    }
}

interface MediaProps {
    geometry: Plane;
    gl: GL;
    id: string;
    text: string;
    subtext: string;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: { width: number; height: number };
    viewport: { width: number; height: number };
    bend: number;
    borderRadius?: number;
}

class Media {
    extra: number = 0;
    geometry: Plane;
    gl: GL;
    id: string;
    text: string;
    subtext: string;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: { width: number; height: number };
    viewport: { width: number; height: number };
    bend: number;
    borderRadius: number;
    program!: Program;
    plane!: Mesh;
    label!: Label;
    scale!: number;
    padding!: number;
    width!: number;
    widthTotal!: number;
    x!: number;
    speed: number = 0;
    isBefore: boolean = false;
    isAfter: boolean = false;

    constructor({
        geometry,
        gl,
        id,
        text,
        subtext,
        index,
        length,
        renderer,
        scene,
        screen,
        viewport,
        bend,
        borderRadius = 0.02
    }: MediaProps) {
        this.geometry = geometry;
        this.gl = gl;
        this.id = id;
        this.text = text;
        this.subtext = subtext;
        this.index = index;
        this.length = length;
        this.renderer = renderer;
        this.scene = scene;
        this.screen = screen;
        this.viewport = viewport;
        this.bend = bend;
        this.borderRadius = borderRadius;
        this.createShader();
        this.createMesh();
        this.createLabel();
        this.onResize();
    }

    createLabel() {
        this.label = new Label(this.gl, this.plane, this.id);
    }

    createShader() {
        const { texture } = createCardTexture(this.gl, this.id, this.text, this.subtext);

        this.program = new Program(this.gl, {
            depthTest: false,
            depthWrite: false,
            vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec4 texColor = texture2D(tMap, vUv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          
          // Mask for the rounded shape
          float mask = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          // Border logic
          float borderThickness = 0.005; 
          float borderMask = smoothstep(0.0, edgeSmooth, d + borderThickness) * (1.0 - smoothstep(-edgeSmooth, edgeSmooth, d));
          
          vec3 borderColor = vec3(1.0, 1.0, 1.0);
          
          // Combine text and border
          // texColor is the text on transparent background
          float alpha = mask;
          vec3 rgb = mix(texColor.rgb, borderColor, borderMask);
          
          gl_FragColor = vec4(rgb, alpha);
        }
      `,
            uniforms: {
                tMap: { value: texture },
                uSpeed: { value: 0 },
                uTime: { value: 100 * Math.random() },
                uBorderRadius: { value: this.borderRadius }
            },
            transparent: true
        });
    }

    createMesh() {
        this.plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        });
        this.plane.setParent(this.scene);
    }

    update(scroll: { current: number; last: number }, direction: 'right' | 'left') {
        this.plane.position.x = this.x - scroll.current - this.extra;

        const x = this.plane.position.x;
        const H = this.viewport.width / 2;

        if (this.bend === 0) {
            this.plane.position.y = 0;
            this.plane.rotation.z = 0;
        } else {
            const B_abs = Math.abs(this.bend);
            const R = (H * H + B_abs * B_abs) / (2 * B_abs);
            const effectiveX = Math.min(Math.abs(x), H);

            const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
            if (this.bend > 0) {
                this.plane.position.y = -arc;
                this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
            } else {
                this.plane.position.y = arc;
                this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
            }
        }

        this.speed = scroll.current - scroll.last;
        this.program.uniforms.uTime.value += 0.04;
        this.program.uniforms.uSpeed.value = this.speed;

        const planeOffset = this.plane.scale.x / 2;
        const viewportOffset = this.viewport.width / 2;
        this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
        this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

        if (direction === 'right' && this.isBefore) {
            this.extra -= this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
        if (direction === 'left' && this.isAfter) {
            this.extra += this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
    }

    onResize({ screen, viewport }: { screen?: { width: number; height: number }; viewport?: { width: number; height: number } } = {}) {
        if (screen) this.screen = screen;
        if (viewport) {
            this.viewport = viewport;
        }

        // Aim for ~2 cards visible horizontally
        const targetCardsVisible = 2;
        this.plane.scale.x = this.viewport.width / (targetCardsVisible + 0.1);

        // Maintain aspect ratio (Texture is 800x1000 -> 1.25 height factor)
        this.plane.scale.y = this.plane.scale.x * 1.25;

        // Ensure it doesn't overflow height-wise
        if (this.plane.scale.y > this.viewport.height * 0.7) {
            this.plane.scale.y = this.viewport.height * 0.7;
            this.plane.scale.x = this.plane.scale.y / 1.25;
        }

        // Relative padding
        this.padding = this.plane.scale.x * 0.2;
        this.width = this.plane.scale.x + this.padding;
        this.widthTotal = this.width * this.length;
        this.x = this.width * this.index;
    }
}

class App {
    container: HTMLElement;
    scrollSpeed: number;
    scroll: {
        ease: number;
        current: number;
        target: number;
        last: number;
        position?: number;
    };
    onCheckDebounce: (...args: any[]) => void;
    renderer!: Renderer;
    gl!: GL;
    camera!: Camera;
    scene!: Transform;
    planeGeometry!: Plane;
    medias: Media[] = [];
    screen!: { width: number; height: number };
    viewport!: { width: number; height: number };
    raf: number = 0;

    boundOnResize!: () => void;
    boundOnWheel!: (e: Event) => void;
    boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
    boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
    boundOnTouchUp!: () => void;

    isDown: boolean = false;
    start: number = 0;

    constructor(
        container: HTMLElement,
        {
            items,
            bend = 1,
            scrollSpeed = 2,
            scrollEase = 0.05
        }: { items: any[]; bend?: number; scrollSpeed?: number; scrollEase?: number }
    ) {
        this.container = container;
        this.scrollSpeed = scrollSpeed;
        this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
        this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.onResize();
        this.createGeometry();
        this.createMedias(items, bend);
        this.update();
        this.addEventListeners();
    }

    createRenderer() {
        this.renderer = new Renderer({
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio || 1, 2)
        });
        this.gl = this.renderer.gl;
        this.gl.clearColor(0, 0, 0, 0);
        this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
    }

    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.fov = 45;
        this.camera.position.z = 20;
    }

    createScene() {
        this.scene = new Transform();
    }

    createGeometry() {
        this.planeGeometry = new Plane(this.gl, {
            heightSegments: 50,
            widthSegments: 100
        });
    }

    createMedias(items: any[], bend: number) {
        // Clone items for seamless looping
        const galleryItems = items.concat(items).concat(items);
        this.medias = galleryItems.map((data, index) => {
            return new Media({
                geometry: this.planeGeometry,
                gl: this.gl,
                id: data.id,
                text: data.title,
                subtext: data.description,
                index,
                length: galleryItems.length,
                renderer: this.renderer,
                scene: this.scene,
                screen: this.screen,
                viewport: this.viewport,
                bend
            });
        });
    }

    onTouchDown(e: MouseEvent | TouchEvent) {
        this.isDown = true;
        this.scroll.position = this.scroll.current;
        this.start = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    }

    onTouchMove(e: MouseEvent | TouchEvent) {
        if (!this.isDown) return;
        const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const distance = (this.start - x) * (this.scrollSpeed * 0.025);
        this.scroll.target = (this.scroll.position ?? 0) + distance;
    }

    onTouchUp() {
        this.isDown = false;
        this.onCheck();
    }

    isScrolling: boolean = false;
    onWheel(e: Event) {
        if (!this.medias || !this.medias[0] || this.isScrolling) return;

        const wheelEvent = e as WheelEvent;
        const delta = wheelEvent.deltaY || (wheelEvent as any).wheelDelta || (wheelEvent as any).detail;

        if (Math.abs(delta) < 10) return;

        this.isScrolling = true;
        const width = this.medias[0].width;

        if (delta > 0) {
            this.scroll.target += width;
        } else {
            this.scroll.target -= width;
        }

        this.onCheck();

        // Prevent rapid scrolling, ensuring a deliberate "card by card" feel
        setTimeout(() => {
            this.isScrolling = false;
        }, 800);
    }

    onCheck() {
        if (!this.medias || !this.medias[0]) return;
        const width = this.medias[0].width;
        const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
        const item = width * itemIndex;
        this.scroll.target = this.scroll.target < 0 ? -item : item;
    }

    onResize() {
        this.screen = {
            width: this.container.clientWidth,
            height: this.container.clientHeight
        };
        this.renderer.setSize(this.screen.width, this.screen.height);
        this.camera.perspective({
            aspect: this.screen.width / this.screen.height
        });
        const fov = (this.camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;
        this.viewport = { width, height };
        if (this.medias) {
            this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
        }
    }

    update() {
        this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
        const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
        if (this.medias) {
            this.medias.forEach(media => media.update(this.scroll, direction));
        }
        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.scroll.last = this.scroll.current;
        this.raf = window.requestAnimationFrame(this.update.bind(this));
    }

    addEventListeners() {
        this.boundOnResize = this.onResize.bind(this);
        this.boundOnWheel = this.onWheel.bind(this);
        this.boundOnTouchDown = this.onTouchDown.bind(this);
        this.boundOnTouchMove = this.onTouchMove.bind(this);
        this.boundOnTouchUp = this.onTouchUp.bind(this);
        window.addEventListener('resize', this.boundOnResize);
        window.addEventListener('mousewheel', this.boundOnWheel);
        window.addEventListener('wheel', this.boundOnWheel);
        window.addEventListener('mousedown', this.boundOnTouchDown);
        window.addEventListener('mousemove', this.boundOnTouchMove);
        window.addEventListener('mouseup', this.boundOnTouchUp);
        window.addEventListener('touchstart', this.boundOnTouchDown);
        window.addEventListener('touchmove', this.boundOnTouchMove);
        window.addEventListener('touchend', this.boundOnTouchUp);
    }

    destroy() {
        window.cancelAnimationFrame(this.raf);
        window.removeEventListener('resize', this.boundOnResize);
        window.removeEventListener('mousewheel', this.boundOnWheel);
        window.removeEventListener('wheel', this.boundOnWheel);
        window.removeEventListener('mousedown', this.boundOnTouchDown);
        window.removeEventListener('mousemove', this.boundOnTouchMove);
        window.removeEventListener('mouseup', this.boundOnTouchUp);
        window.removeEventListener('touchstart', this.boundOnTouchDown);
        window.removeEventListener('touchmove', this.boundOnTouchMove);
        window.removeEventListener('touchend', this.boundOnTouchUp);
        if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
            this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
        }
    }
}

const DEFAULT_ITEMS = [
    { id: "01", title: "Resilience Is Our Signature", description: "We don’t complain, we solve. We don’t escape pressure, we rise through it. Mistakes happen — but we take radical responsibility, learn fast, and move forward stronger." },
    { id: "02", title: "We Build Builders", description: "This is a place to become your strongest self — professionally, personally, and patriotically. Here, you grow in knowledge, skill, discipline, and vision. Because Tsalla Aerospace is not just building aircraft — We’re building citizens. We’re building leaders." },
    { id: "03", title: "We Don’t Clock In, We Show Up", description: "This is not a shift job. This is our runway. We show up with our brains sharp, our hearts aligned, and our sleeves rolled up. Because someday, we’ll look back and say: 'We built something that mattered.'" },
    { id: "04", title: "Integrity Is Non-Negotiable", description: "We will never cheat — not people, not processes, not ourselves. No shortcuts, no dishonesty — even if it costs us. Because at Tsalla, how we win is as important as winning itself." },
    { id: "05", title: "Everyone Is a Leader Here", description: "No one hides behind titles. If you see a problem, you own it. If you have an idea, you voice it. Whether you joined yesterday or were here from Day 1 — you matter." },
    { id: "06", title: "United by Purpose, Not Uniformity", description: "We all have different backgrounds, motivations, and dreams — and that’s okay. But when we’re here — we’re united. By discipline. By ownership. By belief in a cause bigger than us." }
];

export default function CircularGallery({
    bend = 3,
    scrollSpeed = 2,
    scrollEase = 0.05
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const app = new App(containerRef.current, {
            items: DEFAULT_ITEMS,
            bend,
            scrollSpeed,
            scrollEase
        });
        return () => {
            app.destroy();
        };
    }, [bend, scrollSpeed, scrollEase]);

    return <div className="circular-gallery" ref={containerRef} />;
}
