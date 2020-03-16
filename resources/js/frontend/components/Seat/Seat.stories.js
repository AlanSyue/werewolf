import Seat from "Seat/Seat";


const paddedDecorator = () => {
    return {
        template:
            '<div style="margin: 16px; padding: 16px;"><story/></div>'
    };
};

export default {
    title: "Seat",
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
    decorators: [paddedDecorator]
};

const Template = `<Seat :active="active" :number="number" :content="content" :self-active="selfActive"/>`;

// default task state
export const SeatData = {
    number: {
        default: 1
    },
    content: {
        default: "name"
    },
    active: {
        default: false
    },
    selfActive: {
        default: false
    }
};

export const DeafultNoActive = () => ({
    components: { Seat },
    template: Template,
    props: SeatData
});

export const DeafultActive = () => ({
    components: { Seat },
    template: Template,
    props: {
        ...SeatData,
        active: {
            default: true
        }
    }
});

export const SelfNoActive = () => ({
    components: { Seat },
    template: Template,
    props: {
        ...SeatData,
        selfActive: {
            default: true
        }
    }
});

export const SelfActive = () => ({
    components: { Seat },
    template: Template,
    props: {
        ...SeatData,
        active: {
            default: true
        },
        selfActive: {
            default: true
        }
    }
});
