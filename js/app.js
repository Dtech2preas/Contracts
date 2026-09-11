const { createApp, ref, reactive } = Vue;

createApp({
    setup() {
        const currentStep = ref('select_template'); // 'select_template', 'fill_form', 'preview'
        const templates = ref(templatesData);

        const currentTemplate = ref(null);
        const answers = reactive({});
        const customClauses = ref([]);
        const selectedStyle = ref('modern');

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

        const selectTemplate = (index) => {
            // Deep copy the template so modifications don't affect original
            currentTemplate.value = JSON.parse(JSON.stringify(templates.value[index]));

            // Reset answers and clauses
            for (let key in answers) {
                delete answers[key];
            }
            customClauses.value = [];

            currentStep.value = 'fill_form';
        };

        const previewDocument = () => {
            currentStep.value = 'preview';
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

            selectTemplate,
            previewDocument,

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
