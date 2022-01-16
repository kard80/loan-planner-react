import { toaster } from "evergreen-ui";

export const toasterCustom = {
    ...toaster,
    notify: (title: string, settings?: any) => {
        toaster.notify(title, {...settings, duration: 2});
    },
    success: (title: string, settings?: any) => {
        toaster.success(title, {...settings, duration: 2});
    },
    warning: (title: string, settings?: any) => {
        toaster.warning(title, {...settings, duration: 2});
    },
    danger: (title: string, settings?: any) => {
        toaster.danger(title, {...settings, duration: 2});
    }
}