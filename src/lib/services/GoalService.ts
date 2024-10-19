import { supabase } from "$lib/supabase/supabase";
import { Service } from "./Service";

export class GoalService extends Service {
    static create(): GoalService {
        return new GoalService(supabase)
    }
}