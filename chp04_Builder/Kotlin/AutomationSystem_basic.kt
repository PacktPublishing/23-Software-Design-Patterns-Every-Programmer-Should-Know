// Step 1: Define the Product
data class AutomationRoutine(
    var name: String? = null,
    var actions: MutableList<String> = mutableListOf(),
    var schedule: String? = null
)

// Step 2: Create the Builder Interface
interface AutomationRoutineBuilder {
    fun setName(name: String): AutomationRoutineBuilder
    fun addAction(action: String): AutomationRoutineBuilder
    fun setSchedule(schedule: String): AutomationRoutineBuilder
    fun build(): AutomationRoutine
}

// Step 3: Implement Concrete Builders
class MorningRoutineBuilder : AutomationRoutineBuilder {
    private val routine = AutomationRoutine()

    override fun setName(name: String): AutomationRoutineBuilder {
        routine.name = name
        return this
    }

    override fun addAction(action: String): AutomationRoutineBuilder {
        routine.actions.add(action)
        return this
    }

    override fun setSchedule(schedule: String): AutomationRoutineBuilder {
        routine.schedule = schedule
        return this
    }

    override fun build(): AutomationRoutine {
        return routine
    }
}

class EveningRoutineBuilder : AutomationRoutineBuilder {
    private val routine = AutomationRoutine()

    override fun setName(name: String): AutomationRoutineBuilder {
        routine.name = name
        return this
    }

    override fun addAction(action: String): AutomationRoutineBuilder {
        routine.actions.add(action)
        return this
    }

    override fun setSchedule(schedule: String): AutomationRoutineBuilder {
        routine.schedule = schedule
        return this
    }

    override fun build(): AutomationRoutine {
        return routine
    }
}

// Step 4: Create the Director
class AutomationRoutineDirector(private val builder: AutomationRoutineBuilder) {
    fun constructMorningRoutine(): AutomationRoutine {
        return builder
            .setName("Morning Routine")
            .addAction("Turn on coffee maker")
            .addAction("Open blinds")
            .addAction("Set thermostat to 72°F")
            .setSchedule("Every day at 7:00 AM")
            .build()
    }

    fun constructEveningRoutine(): AutomationRoutine {
        return builder
            .setName("Evening Routine")
            .addAction("Turn off lights")
            .addAction("Lock doors")
            .addAction("Set thermostat to 68°F")
            .setSchedule("Every day at 10:00 PM")
            .build()
    }
}

// Step 5: Client Code
fun main() {
    // Build a Morning Routine
    val morningBuilder = MorningRoutineBuilder()
    val morningDirector = AutomationRoutineDirector(morningBuilder)
    val morningRoutine = morningDirector.constructMorningRoutine()
    println(morningRoutine)

    // Build an Evening Routine
    val eveningBuilder = EveningRoutineBuilder()
    val eveningDirector = AutomationRoutineDirector(eveningBuilder)
    val eveningRoutine = eveningDirector.constructEveningRoutine()
    println(eveningRoutine)
}
