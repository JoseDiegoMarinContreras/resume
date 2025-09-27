import { defineCollection, z, } from 'astro:content';
import { glob, } from 'astro/loaders'

const _glob = (collection: string) => glob({ pattern: '**/[^_]*.md', base: `./src/data/${collection}`, });

const section = defineCollection({
    loader: _glob('section'),
    schema: z.object({
        sections: z.array(z.object({
            id: z.string(),
            name: z.string(),
        })),
    }),
});

const info = defineCollection({
    loader:  _glob('info'),
    schema: z.object({
        firstNme: z.string(),
        lastName: z.string(),
        role: z.string(),
    }),
});

const resume = defineCollection({
    loader: _glob('resume'),
    schema: z.object({
        downloadButton: z.string(),
        url: z.string(),
    }),
});

const about = defineCollection({
    loader: _glob('about'),
    schema: z.object({
        summary: z.string()
    }),
});

export const collections = {
    section,
    info,
    resume,
    about,
};