import {localeProps} from '../../utils';

const label = '导航容器';
const name = 'fcNav';

export default {
    menu: 'layout',
    icon: 'icon-menu',
    label,
    name,
    mask: false,
    children: 'fcMenuItem',
    rule() {
        return {
            type: name,
            props: {
                mode: 'horizontal',
                defaultActive: '1'
            },
            children: []
        };
    },
    props(_, {t}) {
        return localeProps(t, name + '.props', [{
            type: 'select',
            field: 'mode',
            title: '模式',
            value: 'horizontal',
            options: [
                {label: '水平', value: 'horizontal'}, 
                {label: '垂直', value: 'vertical'}
            ]
        }, {
            type: 'input',
            field: 'defaultActive',
            title: '默认激活菜单',
            value: '1'
        }, {
            type: 'input',
            field: 'backgroundColor',
            title: '背景色',
            props: {placeholder: '#ffffff'}
        }, {
            type: 'input',
            field: 'textColor',
            title: '文字颜色',
            props: {placeholder: '#303133'}
        }, {
            type: 'input',
            field: 'activeTextColor',
            title: '激活文字颜色',
            props: {placeholder: '#409eff'}
        }, {
            type: 'switch',
            field: 'collapse',
            title: '是否水平折叠'
        }, {
            type: 'switch',
            field: 'ellipsis',
            title: '是否省略多余的子项',
            value: true
        }]);
    }
};
