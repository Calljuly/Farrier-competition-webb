export const linksAdmin = [
    {
        id: 0,
        label: "HOME",
        path: "/",
        exact: true,
    },
    {
        id: 1,
        label: "PROFILE",
        path: "/myProfile",
        exact: false,
    },
    {
        id: 2,
        label: "COMPETITIONS",
        path: "/competitions",
        exact: false,
    },
    {
        id: 3,
        label: "ADMIN",
        path: "/admin",
        exact: false,
    },
    {
        id: 4,
        label: "CONTACT",
        path: "/contact",
        exact: false,
    },
];

export const linksUnAuth = [
    {
        id: 0,
        label: "HOME",
        path: "/",
        exact: true,
    },
    {
        id: 2,
        label: "COMPETITIONS",
        path: "/competitions",
        exact: false,
    },
    {
        id: 4,
        label: "CONTACT",
        path: "/contact",
        exact: false,
    },
];

export const linksAuth = [
    {
        id: 0,
        label: "HOME",
        path: "/",
        exact: true,
    },
    {
        id: 6,
        label: "ABOUT",
        path: "/about",
        exact: true,
    },
    {
        id: 1,
        label: "PROFILE",
        path: "/myProfile",
        exact: false,
    },
    {
        id: 5,
        label: "EDIT PROFILE",
        path: "/myProfile/editProfile",
        exact: false,
    },
    {
        id: 2,
        label: "COMPETITIONS",
        path: "/competitions",
        exact: false,
    },
    {
        id: 4,
        label: "CONTACT",
        path: "/contact",
        exact: false,
    },
];