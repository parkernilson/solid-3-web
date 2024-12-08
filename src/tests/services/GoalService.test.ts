import { GoalService } from "$lib/services/GoalService.svelte"
import { supabase } from "$lib/supabase/supabase"
import { beforeAll, describe, it } from "vitest"

describe("GoalService", async () => {
    let goalService: GoalService

    beforeAll(async () => {
        goalService = GoalService.make()
    })
    
    // This test is left as an example for how to set up tests in the future
    it.skip("Example: should get a list of paginated entries", async () => {
        await supabase.auth.signInWithPassword({
            email: "danexample@gmail.com",
            password: "***"
        })
        const result = await goalService.getEntriesPaginated("e962f5f7-5e82-47c6-a5a2-9b9b00e3bdbe", 10, '2024-11-25')
        console.log(result)
    })
})