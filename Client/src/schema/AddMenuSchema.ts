import * as z from "zod";

export const menuFormSchema = z.object({
    menuTitle: z.string().min(1, { error: "Menu title is required!" }),
    description: z.string().min(1, "Menu description is required!"),
    price: z.number().min(1, "Menu price is required!"),
    menuImage: z.instanceof(File).optional().refine((file) => file?.size !== 0, { error: "Image file is required!" })
});

export type MenuFormState = z.infer<typeof menuFormSchema>;