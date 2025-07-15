import z from "zod";
// import { zfd } from "zod-form-data";

export const LOGIN_SCHEMA = z.object({
    email: z.email(),
    password: z.string().min(8).max(128),
});

// export const LOGIN_SCHEMA = zfd.formData({
//     email: zfd.text(z.email()),
//     password: zfd.text(z.string().min(8).max(128)),
// });