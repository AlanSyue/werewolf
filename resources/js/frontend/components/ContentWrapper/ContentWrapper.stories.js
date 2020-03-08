import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import ContentWrapper from "./ContentWrapper";

const paddedDecorator = () => {
    return {
        template:
            '<div style="background-color: #1E1F4A; margin: 16px; padding: 16px;"><story/></div>'
    };
};

export default {
    title: "ContentWrapper",
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
    decorators: [paddedDecorator, withKnobs]
};


const template = `
    <ContentWrapper
        :theme="theme"
        :showGoBackBtn="showGoBackBtn"
        :goBackBtnText="goBackBtnText"
        :goBackBtnEvent="goBackBtnEvent"
        :actionBtnText="actionBtnText"
        :actionBtnEvent="actionBtnEvent"
    >
        <h1>這是內容</h1>
        <p>這是段落這是段落這是段落這是段落這是段落這是段落</p>
    </ContentWrapper>
`;

const actionsData = {
    goBackBtnEvent: action('goBackBtnEvent'),
    actionBtnEvent: action('ActionButtonClick')
};

const defaultProps = {
    theme: {
        default: ''
    },
    showGoBackBtn: {
        default: true
    },
    goBackBtnText: {
        default: '回上頁'
    },
    actionBtnText: {
        default: '點擊按鈕'
    }
}


export const Default = () => ({
    components: { ContentWrapper },
    template: template,
    props: defaultProps,
    methods: actionsData
});


export const WithBorder = () => ({
    components: { ContentWrapper },
    template: template,
    props: {
        ...defaultProps,
        theme: {
            default: 'border'
        }
    },
    methods: actionsData
})
