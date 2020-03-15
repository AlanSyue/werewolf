import Seat from "Seat/Seat";

export default {
    title: "Seat",
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/
};

const Template = `
    <div>
        <div style="16px; padding: 16px; background-color: #DEDEDE">
            <p>theme-normal:</p>
            <br/><br/>
            <Seat :theme="'normal'"  :active="active" :number="number" :content="content" :self-active="selfActive"/>
            <br/><br/>
        </div>
        <div style="16px; padding: 16px; background-color: #1E1F4A">
            <p>theme-gameuser:</p>
            <br/><br/>
            <Seat :theme="'gameuser'" :active="active" :number="number" :content="content" :self-active="selfActive"/>
        </div>
    </div>
`;

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
    },
    theme: {
        default: 'normal'
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
