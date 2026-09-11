const templatesData = [
    {
        title: "Boyfriend Application",
        description: "A fun, semi-serious form to evaluate a potential boyfriend.",
        sections: [
            {
                title: "SECTION 1 — Personal Information",
                questions: [
                    { id: "full_name", label: "Full name", type: "text", required: true },
                    { id: "age", label: "Age", type: "number", required: true },
                    { id: "occupation", label: "Occupation", type: "text", required: false },
                    { id: "location", label: "Location", type: "text", required: false },
                    { id: "relationship_status", label: "Current relationship status", type: "radio", options: ["Single", "It's complicated", "Married but separated"], required: true },
                    { id: "children", label: "Children", type: "yes_no", required: false }
                ]
            },
            {
                title: "SECTION 2 — Relationship History",
                questions: [
                    { id: "prev_duration", label: "Previous relationship duration", type: "text", required: false },
                    { id: "why_end", label: "Why did it end?", type: "textarea", required: false },
                    { id: "over_ex", label: "Are you over your ex?", type: "yes_no", required: true },
                    { id: "comm_ex", label: "Do you communicate with your ex?", type: "yes_no", required: true },
                    { id: "taught", label: "What did your previous relationship teach you?", type: "textarea", required: false }
                ]
            },
            {
                title: "SECTION 3 — Emotional Intelligence",
                questions: [
                    { id: "handle_disagree", label: "How do you handle disagreements?", type: "textarea", required: false },
                    { id: "hurt_response", label: "How do you respond when your partner tells you that something you did hurt them?", type: "textarea", required: false },
                    { id: "comm_upset", label: "Can you communicate when you're upset?", type: "yes_no", required: true }
                ]
            }
        ]
    },
    {
        title: "Roommate Agreement",
        description: "Set clear boundaries and rules for a harmonious living situation.",
        sections: [
            {
                title: "General Information",
                questions: [
                    { id: "roommates_names", label: "Names of all roommates", type: "textarea", required: true },
                    { id: "address", label: "Property Address", type: "text", required: true }
                ]
            },
            {
                title: "Financial Responsibilities",
                questions: [
                    { id: "rent_split", label: "How is rent split?", type: "textarea", required: true },
                    { id: "utilities", label: "Who pays which utilities?", type: "textarea", required: true }
                ]
            },
            {
                title: "House Rules",
                questions: [
                    { id: "quiet_hours", label: "Quiet hours", type: "text", required: false },
                    { id: "guests", label: "Guest policy", type: "textarea", required: false },
                    { id: "cleaning", label: "Cleaning schedule expectation", type: "textarea", required: false }
                ]
            }
        ]
    },
    {
        title: "Friendship Constitution",
        description: "A formal declaration of friendship duties and expectations.",
        sections: [
            {
                title: "Article I: The Parties",
                questions: [
                    { id: "friend_1", label: "Friend 1", type: "text", required: true },
                    { id: "friend_2", label: "Friend 2", type: "text", required: true }
                ]
            },
            {
                title: "Article II: Duties and Obligations",
                questions: [
                    { id: "hangout_freq", label: "Minimum hangout frequency", type: "radio", options: ["Weekly", "Bi-weekly", "Monthly", "Whenever we survive our jobs"], required: true },
                    { id: "brutal_honesty", label: "Brutal honesty level allowed", type: "rating", required: true }
                ]
            }
        ]
    }
];
