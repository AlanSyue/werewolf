import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Button from "./Button";

const paddedDecorator = () => {
    return {
        template:
            '<div style="background-color: #1E1F4A; margin: 16px; padding: 16px;"><story/></div>'
    };
};

export default {
    title: "Button",
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
    decorators: [paddedDecorator, withKnobs]
};


const ButtonTemplate = `
    <div>
        <div>
            <Button type="primary" @onClick="onClick" :isDisabled="isDisabled">Primary</Button>
            <Button type="secondary" @onClick="onClick" :isDisabled="isDisabled">Secondary</Button>
        </div>
        <div>
            <Button @onClick="onClick" size="medium" :isDisabled="isDisabled">medium</Button>
            <Button @onClick="onClick" size="small" :isDisabled="isDisabled">small</Button>
        </div>
    </div>
`;

export const actionsData = {
    onClick: action('ButtonClick')
};

  
export const AllButton = () => ({
    components: { Button },
    template: ButtonTemplate,
    props: {
        isDisabled: {
            default: boolean('Disabled', false)
        }
    },
    methods: actionsData
});
