import data from '../data/data.js';

export const home =(req, res) => {
    res.render("home", data)
}
 tasks = [
    {
        "id": 1,
        "task": "Working for programming 3",
        "checked": false,
    },
    {
        "id": 2,
        "task": "chatting with other students",
        "checked": false,
    }
]
