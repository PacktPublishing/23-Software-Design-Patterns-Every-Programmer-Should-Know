// Step 1: Define the Product
class AutomationRoutine {
    var name: String?
    var actions: [String] = []
    var schedule: String?
    
    func description() -> String {
        return """
        Automation Routine:
        Name: \(name ?? "Unnamed")
        Actions: \(actions.joined(separator: ", "))
        Schedule: \(schedule ?? "No schedule")
        """
    }
}

// Step 2: Create the Builder Protocol
protocol AutomationRoutineBuilder {
    func setName(_ name: String) -> AutomationRoutineBuilder
    func addAction(_ action: String) -> AutomationRoutineBuilder
    func setSchedule(_ schedule: String) -> AutomationRoutineBuilder
    func build() -> AutomationRoutine
}

// Step 3: Implement Concrete Builders
class MorningRoutineBuilder: AutomationRoutineBuilder {
    private var routine = AutomationRoutine()
    
    func setName(_ name: String) -> AutomationRoutineBuilder {
        routine.name = name
        return self
    }
    
    func addAction(_ action: String) -> AutomationRoutineBuilder {
        routine.actions.append(action)
        return self
    }
    
    func setSchedule(_ schedule: String) -> AutomationRoutineBuilder {
        routine.schedule = schedule
        return self
    }
    
    func build() -> AutomationRoutine {
        return routine
    }
}

class EveningRoutineBuilder: AutomationRoutineBuilder {
    private var routine = AutomationRoutine()
    
    func setName(_ name: String) -> AutomationRoutineBuilder {
        routine.name = name
        return self
    }
    
    func addAction(_ action: String) -> AutomationRoutineBuilder {
        routine.actions.append(action)
        return self
    }
    
    func setSchedule(_ schedule: String) -> AutomationRoutineBuilder {
        routine.schedule = schedule
        return self
    }
    
    func build() -> AutomationRoutine {
        return routine
    }
}

// Step 4: Create the Director
class AutomationRoutineDirector {
    private var builder: AutomationRoutineBuilder
    
    init(builder: AutomationRoutineBuilder) {
        self.builder = builder
    }
    
    func constructMorningRoutine() -> AutomationRoutine {
        return builder
            .setName("Morning Routine")
            .addAction("Turn on coffee maker")
            .addAction("Open blinds")
            .addAction("Set thermostat to 72°F")
            .setSchedule("Every day at 7:00 AM")
            .build()
    }
    
    func constructEveningRoutine() -> AutomationRoutine {
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
let morningBuilder = MorningRoutineBuilder()
let morningDirector = AutomationRoutineDirector(builder: morningBuilder)
let morningRoutine = morningDirector.constructMorningRoutine()
print(morningRoutine.description())

let eveningBuilder = EveningRoutineBuilder()
let eveningDirector = AutomationRoutineDirector(builder: eveningBuilder)
let eveningRoutine = eveningDirector.constructEveningRoutine()
print(eveningRoutine.description())
