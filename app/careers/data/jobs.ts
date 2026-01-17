export interface JobPosition {
    id: string;
    slug: string;
    title: string;
    category: "Internship" | "Full-Time";
    location: string;
    department: string;
    shortDescription: string;
    about: string;
    responsibilities: string[];
    requirements: string[];
}

const formatSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// Helper to generate distinct content based on the role
const getRoleContent = (title: string, category: "Internship" | "Full-Time", shortDesc: string) => {
    const isIntern = category === "Internship";

    const commonResponsibilities = isIntern
        ? [
            "Collaborate with senior engineers to design and test new system components.",
            "Assist in data collection, analysis, and reporting for ongoing projects.",
            "Participate in design reviews and technical team meetings.",
            "Document processes and test results for internal knowledge bases."
        ]
        : [
            "Lead the end-to-end development lifecycle of critical aerospace subsystems.",
            "Mentor junior engineers and guide technical decision-making.",
            "Interface with cross-functional teams to align on system requirements.",
            "Drive innovation in autonomous flight technologies."
        ];

    const commonRequirements = isIntern
        ? [
            "Currently pursuing a Bachelor’s or Master’s in Engineering, Computer Science, or related field.",
            "Strong fundamental understanding of core engineering principles.",
            "Eagerness to learn and adapt in a fast-paced environment.",
            "Basic proficiency with relevant software tools (e.g., CAD, Python, MATLAB)."
        ]
        : [
            "Bachelor’s or Master’s degree in a relevant technical discipline.",
            "3+ years of industry experience in aerospace or autonomous systems.",
            "Proven track record of delivering complex technical projects.",
            "Strong problem-solving skills and ability to work independently."
        ];

    // Specific overrides for key roles to ensure uniqueness
    let specificResponsibilities = [...commonResponsibilities];
    let specificRequirements = [...commonRequirements];
    let specificAbout = `Tsalla Aerospace is seeking a ${title} to join our team. ${shortDesc} You will play a key role in advancing our mission to revolutionize aerial autonomy.`;

    if (title.includes("Software") || title.includes("Computer Vision")) {
        specificResponsibilities.push("Develop and optimize high-performance algorithms for real-time applications.");
        specificResponsibilities.push("Write clean, maintainable, and well-documented code in C++ and Python.");
        specificRequirements.push("Proficiency in C++, Python, and Linux environments.");
        specificRequirements.push("Experience with ROS/ROS2 is highly desirable.");
    } else if (title.includes("Mechanical") || title.includes("Manufacturing")) {
        specificResponsibilities.push("Design robust mechanical parts using CAD software (SolidWorks/NX).");
        specificResponsibilities.push("Oversee prototyping and fabrication of structural components.");
        specificRequirements.push("Strong CAD proficiency and knowledge of manufacturing processes.");
        specificRequirements.push("Experience with FEA and structural analysis.");
    } else if (title.includes("Flight Test") || title.includes("Operations")) {
        specificResponsibilities.push("Plan and execute flight test missions in various environmental conditions.");
        specificResponsibilities.push("Analyze flight telemetry data to validate system performance.");
        specificRequirements.push("Visual Observer (VO) or remote pilot certification is a plus.");
        specificRequirements.push("Willingness to travel to remote test sites.");
    }

    return {
        about: specificAbout,
        responsibilities: specificResponsibilities,
        requirements: specificRequirements
    };
};

const createJob = (title: string, category: "Internship" | "Full-Time", shortDescription: string): JobPosition => {
    const content = getRoleContent(title, category, shortDescription);
    return {
        id: formatSlug(title),
        slug: formatSlug(title),
        title,
        category,
        location: category === "Internship" ? "Remote / Anywhere" : "Tel-Aviv / Onsite",
        department: category === "Internship" ? "Early Career Program" : "Operations",
        shortDescription,
        about: content.about,
        responsibilities: content.responsibilities,
        requirements: content.requirements
    };
};

export const internships: JobPosition[] = [
    createJob("Aerospace Engineering Intern, EMEA", "Internship", "Support UAV hardware development, flight testing, and component integration in agile engineering teams."),
    createJob("Communications Intern, EMEA", "Internship", "Assist in internal/external communications, social media strategy, and brand alignment for Tsalla Aerospace."),
    createJob("Legal Intern, EMEA", "Internship", "Contribute to legal research, compliance documentation, and policy analysis under mentorship."),
    createJob("Strategic Finance & Analytics Intern, EMEA", "Internship", "Help analyze budgets, forecast scenarios, and track KPIs across various business divisions."),
    createJob("Data Visualization Intern, EMEA", "Internship", "Work with real-time drone telemetry to build visualizations for tactical awareness dashboards."),
    createJob("Avionics Systems Intern, EMEA", "Internship", "Assist in testing and integration of avionics hardware for next-gen UAV platforms."),
    createJob("Computer Vision Intern, EMEA", "Internship", "Support R&D efforts in object detection and tracking algorithms for autonomous flight."),
    createJob("Manufacturing Engineering Intern, EMEA", "Internship", "Help optimize production workflows and quality control processes for drone manufacturing."),
    createJob("Supply Chain & Operations Intern, EMEA", "Internship", "Analyze supply chain logistics and assist in procurement for aerospace components."),
    createJob("UAV Flight Operations Intern, EMEA", "Internship", "Participate in flight test planning, execution, and data analysis for experimental aircraft.")
];

export const fullTimeRoles: JobPosition[] = [
    createJob("Autonomy Software Engineer", "Full-Time", "Design and implement advanced AI algorithms for real-time UAV navigation and object detection."),
    createJob("Flight Test Engineer", "Full-Time", "Lead system validation missions and post-flight data analysis to iterate on drone platforms."),
    createJob("Embedded Systems Developer", "Full-Time", "Develop high-performance embedded code for control systems and edge computing applications."),
    createJob("Senior Aerodynamics Engineer", "Full-Time", "Lead aerodynamic design and CFD analysis for high-speed autonomous aerial vehicles."),
    createJob("GNC Engineer", "Full-Time", "Design robust guidance, navigation, and control algorithms for precision flight in denied environments."),
    createJob("Mechanical Design Lead", "Full-Time", "Oversee the mechanical architecture and structural integrity of diverse UAV airframes."),
    createJob("AI/ML Research Scientist", "Full-Time", "Research and deploy state-of-the-art machine learning models for autonomous decision-making."),
    createJob("Defense Program Manager", "Full-Time", "Manage timelines, budgets, and stakeholder relationships for key defense contracts."),
    createJob("FPGA Engineer", "Full-Time", "Implement high-speed signal processing and logic on FPGA platforms for mission-critical systems."),
    createJob("RF Systems Engineer", "Full-Time", "Design and validate secure communication links and RF subsystems for long-range UAVs."),
    createJob("Head of Production", "Full-Time", "Scale manufacturing operations and ensure delivery targets for mass production of drone fleets."),
    createJob("Quality Assurance Engineer", "Full-Time", "Establish and maintain rigorous quality standards for flight-critical hardware and software."),
    createJob("Field Deployment Specialist", "Full-Time", "Travel to client sites to lead system deployment, training, and technical support operations.")
];

export const allJobs = [...internships, ...fullTimeRoles];
