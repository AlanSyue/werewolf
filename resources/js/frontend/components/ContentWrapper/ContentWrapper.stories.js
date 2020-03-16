import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import ContentWrapper from "ContentWrapper/ContentWrapper";

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
        :showCoverView="showCoverView"
        :coverViewText="coverViewText"
        :showGoBackBtn="showGoBackBtn"
        :goBackBtnText="goBackBtnText"
        :goBackBtnEvent="goBackBtnEvent"
        :goBackBtnDisabled="goBackBtnDisabled"
        :actionBtnText="actionBtnText"
        :actionBtnEvent="actionBtnEvent"
        :actionDisabled="actionDisabled"
    >
        <h1>這是內容</h1>
        <p>這是段落這是段落這是段落這是段落這是段落這是段落</p>
    </ContentWrapper>
`;

const actionsData = {
    goBackBtnEvent: action("goBackBtnEvent"),
    actionBtnEvent: action("ActionButtonClick")
};

const defaultProps = {
    theme: {
        default: ""
    },
    showCoverView: {
        default: false
    },
    coverViewText: {
        default: "等待其他玩家確認 … "
    },
    showGoBackBtn: {
        default: true
    },
    goBackBtnText: {
        default: "回上頁"
    },
    goBackBtnDisabled: {
        default: false
    },
    actionBtnText: {
        default: "點擊按鈕"
    },
    actionDisabled: {
        default: false
    }
};

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
            default: "border"
        }
    },
    methods: actionsData
});

export const hideGoBackBtn = () => ({
    components: { ContentWrapper },
    template: template,
    props: {
        ...defaultProps,
        showGoBackBtn: {
            default: false
        }
    },
    methods: actionsData
});

export const Disabled = () => ({
    components: { ContentWrapper },
    template: template,
    props: {
        ...defaultProps,
        goBackBtnDisabled: {
            default: true
        },
        actionDisabled: {
            default: true
        }
    },
    methods: actionsData
});

export const ShowCoverView = () => ({
    components: { ContentWrapper },
    template: template,
    props: {
        ...defaultProps,
        showCoverView: {
            default: true
        }
    },
    methods: actionsData
});
