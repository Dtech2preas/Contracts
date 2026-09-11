const templatesData = [
    {
        title: "Boyfriend Application",
        category: "Relationships",
        description: "A fun, semi-serious form to evaluate a potential boyfriend.",
        stats: "12 Sections · 47 Questions",
        difficulty: "★★★★★",
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
        title: "Girlfriend Application",
        category: "Relationships",
        description: "Evaluate compatibility, expectations and relationship qualities.",
        stats: "10 Sections · 40 Questions",
        difficulty: "★★★★☆",
        sections: [
            {
                title: "SECTION 1 — Personal Details",
                questions: [
                    { id: "gf_name", label: "Full name", type: "text", required: true },
                    { id: "gf_hobbies", label: "Hobbies & Interests", type: "textarea", required: false }
                ]
            }
        ]
    },
    {
        title: "Relationship Agreement",
        category: "Relationships",
        description: "Define expectations, boundaries, communication and responsibilities.",
        stats: "8 Sections · 30 Questions",
        difficulty: "★★★★☆",
        sections: [
            {
                title: "Core Values",
                questions: [
                    { id: "rel_values", label: "Top 3 relationship values", type: "textarea", required: true }
                ]
            }
        ]
    },
    {
        title: "Friendship Constitution",
        category: "Friendship",
        description: "A formal declaration of friendship duties and expectations.",
        stats: "5 Sections · 15 Questions",
        difficulty: "★★★☆☆",
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
    },
    {
        title: "Best Friend Agreement",
        category: "Friendship",
        description: "Set your friendship rules, expectations and traditions.",
        stats: "4 Sections · 20 Questions",
        difficulty: "★★☆☆☆",
        sections: [
            {
                title: "Traditions",
                questions: [
                    { id: "traditions", label: "Annual traditions", type: "textarea", required: true }
                ]
            }
        ]
    },
    {
        title: "Friend Group Constitution",
        category: "Friendship",
        description: "Create rules for an entire group of friends.",
        stats: "6 Sections · 25 Questions",
        difficulty: "★★★★☆",
        sections: [
            {
                title: "Group Members",
                questions: [
                    { id: "group_members", label: "List all members", type: "textarea", required: true }
                ]
            }
        ]
    },
    {
        title: "Roommate Agreement",
        category: "Living",
        description: "Set clear boundaries and rules for a harmonious living situation.",
        stats: "7 Sections · 35 Questions",
        difficulty: "★★★★★",
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
        title: "House Rules Agreement",
        category: "Living",
        description: "Create shared rules for a household.",
        stats: "5 Sections · 20 Questions",
        difficulty: "★★★☆☆",
        sections: [
            {
                title: "Rules",
                questions: [
                    { id: "core_rules", label: "Top 5 house rules", type: "textarea", required: true }
                ]
            }
        ]
    },
    {
        title: "Chores Agreement",
        category: "Living",
        description: "Divide responsibilities and establish expectations.",
        stats: "4 Sections · 15 Questions",
        difficulty: "★★☆☆☆",
        sections: [
            {
                title: "Chores Breakdown",
                questions: [
                    { id: "daily_chores", label: "Daily Chores Assignment", type: "textarea", required: true }
                ]
            }
        ]
    },
    {
        title: "Club Constitution",
        category: "Groups",
        description: "Establish the foundation and rules for your club.",
        stats: "8 Sections · 30 Questions",
        difficulty: "★★★★☆",
        sections: [
            {
                title: "Club Details",
                questions: [
                    { id: "club_name", label: "Club Name", type: "text", required: true }
                ]
            }
        ]
    },
    {
        title: "Gaming Group Constitution",
        category: "Groups",
        description: "Rules of engagement for your gaming party.",
        stats: "5 Sections · 20 Questions",
        difficulty: "★★★☆☆",
        sections: [
            {
                title: "Gaming Rules",
                questions: [
                    { id: "game_rules", label: "Session rules", type: "textarea", required: true }
                ]
            }
        ]
    },
    {
        title: "Study Group Agreement",
        category: "Groups",
        description: "Keep your study group focused and accountable.",
        stats: "4 Sections · 15 Questions",
        difficulty: "★★☆☆☆",
        sections: [
            {
                title: "Study Schedule",
                questions: [
                    { id: "study_times", label: "Meeting times", type: "text", required: true }
                ]
            }
        ]
    },
    {
        title: "Team Agreement",
        category: "Groups",
        description: "Set expectations for team members and projects.",
        stats: "6 Sections · 25 Questions",
        difficulty: "★★★★☆",
        sections: [
            {
                title: "Team Goals",
                questions: [
                    { id: "team_goals", label: "Primary goals", type: "textarea", required: true }
                ]
            }
        ]
    },
    {
        title: "Personal Loan Agreement",
        category: "Money",
        description: "Document a loan between friends or family.",
        stats: "5 Sections · 15 Questions",
        difficulty: "★★★★★",
        isLegal: true,
        sections: [
            {
                title: "Loan Terms",
                questions: [
                    { id: "loan_amount", label: "Amount", type: "number", required: true },
                    { id: "repayment", label: "Repayment terms", type: "textarea", required: true }
                ]
            }
        ]
    },
    {
        title: "Expense Sharing Agreement",
        category: "Money",
        description: "Agree on how shared expenses will be handled.",
        stats: "4 Sections · 20 Questions",
        difficulty: "★★★★☆",
        isLegal: true,
        sections: [
            {
                title: "Expenses",
                questions: [
                    { id: "shared_expenses", label: "List shared expenses", type: "textarea", required: true }
                ]
            }
        ]
    },
    {
        title: "Payment Agreement",
        category: "Money",
        description: "Establish a payment plan.",
        stats: "4 Sections · 15 Questions",
        difficulty: "★★★★☆",
        isLegal: true,
        sections: [
            {
                title: "Payment Plan",
                questions: [
                    { id: "payment_schedule", label: "Payment Schedule", type: "textarea", required: true }
                ]
            }
        ]
    },
    {
        title: "Custom Agreement",
        category: "Custom",
        description: "Build your own agreement from scratch. Add your own sections and questions.",
        stats: "Fully customizable",
        difficulty: "Variable",
        sections: []
    },
    {
        title: "Constitution Builder",
        category: "Custom",
        description: "Create your own rules, articles, duties, penalties and amendments.",
        stats: "Fully customizable",
        difficulty: "Variable",
        sections: [
            {
                title: "Preamble",
                questions: [
                    { id: "preamble", label: "State the purpose of this constitution", type: "textarea", required: true }
                ]
            }
        ]
    }
];
