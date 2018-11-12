import DrawerNav from '@router/DrawerNavRouter';

export const DrawerNavOpenPage = (pageName, obj) => {
    if (!pageName || !DrawerNav) return;
    DrawerNav.navigate(pageName, obj ? obj : {});
}

export default new class CustomStore {
    navigate = (pageName, params) => {
        const navigation = this.navigator._navigation;
        const { navigate } = navigation;
        navigate && navigate(pageName, params);
    };
}();