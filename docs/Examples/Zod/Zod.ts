import { z } from 'zod';

const UserSchema = z.object({
  name: z.string(),
  age: z.number().min(18),
});

type User = z.infer<typeof UserSchema>;

const userData: User = {
  name: 'John Doe',
  age: 15,
};

const result = UserSchema.safeParse(userData);

if (!result.success) {
  console.error(result.error.errors);
}
