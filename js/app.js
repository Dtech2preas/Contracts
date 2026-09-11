const { createApp, ref, reactive, computed, onMounted, watch } = Vue;

createApp({
    setup() {
        const currentStep = ref('home'); // 'home', 'select_template', 'preview_template', 'fill_form', 'preview_doc'
        const templates = ref(templatesData);

        const searchQuery = ref('');
        const selectedCategory = ref('All');

        const categories = computed(() => {
            const cats = new Set(templates.value.map(t => t.category));
            return ['All', ...Array.from(cats).filter(c => c !== 'Custom')]; // Put custom separate
        });

        const filteredTemplates = computed(() => {
            return templates.value.filter(t => {
                const matchesSearch = t.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                                      t.description.toLowerCase().includes(searchQuery.value.toLowerCase());
                const matchesCategory = selectedCategory.value === 'All' || t.category === selectedCategory.value;
                return matchesSearch && matchesCategory && t.category !== 'Custom';
            });
        });

        const customTemplates = computed(() => {
            return templates.value.filter(t => t.category === 'Custom');
        });

        const groupedTemplates = computed(() => {
            if (searchQuery.value || selectedCategory.value !== 'All') {
                return { 'Search Results': filteredTemplates.value };
            }

            const groups = {};
            filteredTemplates.value.forEach(t => {
                if (!groups[t.category]) {
                    groups[t.category] = [];
                }
                groups[t.category].push(t);
            });
            return groups;
        });

        const recentDocuments = ref([]);
        const currentTemplate = ref(null);
        const answers = reactive({});
        const customClauses = ref([]);
        const selectedStyle = ref('modern');

        const draftKey = 'dtech_draft';
        const recentDocsKey = 'dtech_recent_docs';

        const loadRecentDocs = () => {
            const saved = localStorage.getItem(recentDocsKey);
            if (saved) {
                try {
                    recentDocuments.value = JSON.parse(saved);
                } catch(e) {
                    recentDocuments.value = [];
                }
            }
        };

        const saveRecentDoc = (docTitle) => {
            const newDoc = {
                title: docTitle,
                date: new Date().toLocaleDateString()
            };

            const docs = [newDoc, ...recentDocuments.value].slice(0, 5); // keep last 5
            localStorage.setItem(recentDocsKey, JSON.stringify(docs));
            recentDocuments.value = docs;
        };

        onMounted(() => {
            loadRecentDocs();
        });

        const saveDraft = () => {
            if (!currentTemplate.value) return;
            const draft = {
                template: currentTemplate.value,
                answers: answers,
                customClauses: customClauses.value,
                timestamp: new Date().getTime()
            };
            localStorage.setItem(draftKey, JSON.stringify(draft));
            alert('Draft saved on this device.');
        };

        const loadDraft = () => {
            const saved = localStorage.getItem(draftKey);
            if (saved) {
                try {
                    const draft = JSON.parse(saved);
                    currentTemplate.value = draft.template;

                    // Restore answers
                    for (let key in answers) {
                        delete answers[key];
                    }
                    Object.assign(answers, draft.answers);

                    customClauses.value = draft.customClauses || [];
                    currentStep.value = 'fill_form';
                } catch(e) {
                    console.error("Failed to load draft", e);
                }
            }
        };

        // Modals state
        const showQuestionModal = ref(false);
        const showSectionModal = ref(false);
        const showClauseModal = ref(false);

        // Temp state for new items
        const activeSectionIndex = ref(null);

        const newQuestion = reactive({
            label: '',
            type: 'text',
            optionsString: '',
            required: false
        });

        const newSection = reactive({
            title: ''
        });

        const newClause = reactive({
            text: '',
            type: 'Rule'
        });

        const previewedTemplate = ref(null);

        const viewTemplatePreview = (template) => {
            previewedTemplate.value = template;
            currentStep.value = 'preview_template';
        };

        const startTemplate = (template) => {
            // Deep copy the template so modifications don't affect original
            currentTemplate.value = JSON.parse(JSON.stringify(template));

            // Reset answers and clauses
            for (let key in answers) {
                delete answers[key];
            }
            customClauses.value = [];

            currentStep.value = 'fill_form';
        };

        const startCustomAgreement = () => {
            const customTemplate = templates.value.find(t => t.title === 'Custom Agreement');
            if (customTemplate) startTemplate(customTemplate);
        };

        const startConstitution = () => {
            const constitutionTemplate = templates.value.find(t => t.title === 'Constitution Builder');
            if (constitutionTemplate) startTemplate(constitutionTemplate);
        };

        const previewDocument = () => {
            currentStep.value = 'preview_doc';
        };

        // --- Custom Question Logic ---
        const openCustomQuestionModal = (sectionIndex) => {
            activeSectionIndex.value = sectionIndex;
            newQuestion.label = '';
            newQuestion.type = 'text';
            newQuestion.optionsString = '';
            newQuestion.required = false;
            showQuestionModal.value = true;
        };

        const addCustomQuestion = () => {
            if (!newQuestion.label.trim()) return;

            const id = 'custom_' + Date.now();
            const q = {
                id: id,
                label: newQuestion.label,
                type: newQuestion.type,
                required: newQuestion.required
            };

            if (q.type === 'radio' || q.type === 'checkbox') {
                q.options = newQuestion.optionsString.split(',').map(s => s.trim()).filter(s => s);
                if (q.type === 'checkbox') {
                    answers[id] = [];
                }
            }

            currentTemplate.value.sections[activeSectionIndex.value].questions.push(q);
            showQuestionModal.value = false;
        };

        // --- Custom Section Logic ---
        const openCustomSectionModal = () => {
            newSection.title = '';
            showSectionModal.value = true;
        };

        const addCustomSection = () => {
            if (!newSection.title.trim()) return;

            currentTemplate.value.sections.push({
                title: newSection.title,
                questions: []
            });
            showSectionModal.value = false;
        };

        // --- Custom Clause Logic ---
        const openCustomClauseModal = () => {
            newClause.text = '';
            newClause.type = 'Rule';
            showClauseModal.value = true;
        };

        const addCustomClause = () => {
            if (!newClause.text.trim()) return;

            customClauses.value.push({
                text: newClause.text,
                type: newClause.type
            });
            showClauseModal.value = false;
        };

        // --- PDF Generation ---
        const generatePDF = () => {
            saveRecentDoc(currentTemplate.value.title);

            const element = document.getElementById('document-content');
            const opt = {
                margin:       1,
                filename:     `${currentTemplate.value.title.replace(/\s+/g, '_')}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            html2pdf().set(opt).from(element).save();
        };

        // Helpers
        const hasAnswer = (question) => {
            const ans = answers[question.id];
            if (ans === undefined || ans === null || ans === '') return false;
            if (Array.isArray(ans) && ans.length === 0) return false;
            return true;
        };

        const formatAnswer = (ans) => {
            if (Array.isArray(ans)) return ans.join(', ');
            return ans;
        };

        return {
            currentStep,
            templates,

            searchQuery,
            selectedCategory,
            categories,
            groupedTemplates,
            customTemplates,
            recentDocuments,
            previewedTemplate,

            currentTemplate,
            answers,
            customClauses,
            selectedStyle,

            showQuestionModal,
            showSectionModal,
            showClauseModal,

            newQuestion,
            newSection,
            newClause,

            viewTemplatePreview,
            startTemplate,
            startCustomAgreement,
            startConstitution,
            previewDocument,

            saveDraft,
            loadDraft,

            openCustomQuestionModal,
            addCustomQuestion,

            openCustomSectionModal,
            addCustomSection,

            openCustomClauseModal,
            addCustomClause,

            generatePDF,
            hasAnswer,
            formatAnswer
        };
    }
}).mount('#app');
