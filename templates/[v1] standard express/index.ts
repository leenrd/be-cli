import api from "@/api";
import connectToDatabase from "@/lib/db";
import { PORT } from "@/lib/env";

api.listen(PORT, async () => {
  console.log(`> Server is running on port ${PORT}`);

  await connectToDatabase();
});
