"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const App = () => {
    const [user, setUser] = (0, react_1.useState)(null);
    console.log("Component loaded");
    console.info("Initializing user state");
    (0, react_1.useEffect)(() => {
        console.group("useEffect Hook");
        console.debug("Fetching user data");
        const fetchData = async () => {
            try {
                console.time("Fetch Time");
                const response = await fetch('/api/user');
                const data = await response.json();
                console.timeEnd("Fetch Time");
                console.log("Fetched data:", data);
                // Type assertion for fetched data
                setUser(data);
            }
            catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
        console.groupEnd();
    }, []);
    const handleClick = () => {
        console.assert(user !== null, "User must be defined before clicking");
        console.count("Button Clicked");
    };
    const unusedFunction = () => {
        console.clear();
        console.warn("This function is not used");
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "app", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Welcome" }), user ? ((0, jsx_runtime_1.jsxs)("p", { onClick: handleClick, children: ["Hi, ", user.name] })) : ((0, jsx_runtime_1.jsx)("p", { children: "Loading..." }))] }));
};
exports.default = App;
// Below are some test console cases
console.table([{ id: 1 }, { id: 2 }]);
console.dir({ deep: { object: true } });
console.profile("Render Profile");
console.profileEnd("Render Profile");
console.timeStamp("Render Done");
