import StoryRouter from 'storybook-vue-router';
import PageHeader from "./PageHeader";

const paddedDecorator = () => {
    return {
        template:
            '<div style="background-color: #1E1F4A; padding: 16px;"><story/></div>'
    };
};

const Home = {
    template: `
        <div style="padding-top: 40px;">
            首頁
            <router-link to="/">Home</router-link>
            <router-link to="/Room">Room</router-link>
        </div>`
  };
   
const Room = {
    template: `
        <div style="padding-top: 40px;">
            房間
            <router-link to="/">Home</router-link>
            <router-link to="/Room">Room</router-link>
        </div>`
};

const router = StoryRouter({}, {
    routes: [
      { path: '/', component: Home, meta: { title: "首頁" }},
      { path: '/room', component: Room, meta: { title: "房間" } }
]});

export default {
    title: "PageHeader",
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
    decorators: [router, paddedDecorator]
};


const Template = `
    <div>
        <page-header></page-header>
        <router-view></<router-view>
    </div>
`;
 
export const Default = () => ({
    components: { PageHeader },
    template: Template
});
