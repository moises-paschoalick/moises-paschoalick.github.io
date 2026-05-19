Solving with Abstract Class
Here's how you'd refactor the same problem using an abstract class instead of an interface. The core idea is identical (depend on an abstraction, inject the dependency), but the abstraction itself is a class that can hold shared state and partial implementation.
java// SOLUTION: Abstract Class — Low Coupling with shared behavior

abstract class Motor {
    protected String fuelType;

    public Motor(String fuelType) {
        this.fuelType = fuelType;
    }

    // Abstract method — each subclass must define how it starts
    public abstract void start();

    // Concrete method — shared by all motors
    public void showFuel() {
        System.out.println("Fuel type: " + fuelType);
    }
}

class DieselEngine extends Motor {
    public DieselEngine() {
        super("Diesel");
    }

    @Override
    public void start() {
        System.out.println("Diesel engine started");
    }
}

class ElectricEngine extends Motor {
    public ElectricEngine() {
        super("Electricity");
    }

    @Override
    public void start() {
        System.out.println("Electric engine started");
    }
}

class Car {
    private Motor motor;

    // Dependency Injection: accepts any Motor subclass
    public Car(Motor motor) {
        this.motor = motor;
    }

    public void start() {
        motor.showFuel();
        motor.start();
    }
}

public class Main {
    public static void main(String[] args) {
        Motor motor = new ElectricEngine();
        Car car = new Car(motor);
        car.start();
        // Output:
        // Fuel type: Electricity
        // Electric engine started
    }
}
Key differences from the interface version
The structure looks almost the same, but the abstract class brings two things an interface (traditionally) does not:

Shared state — fuelType lives in the parent. Every subclass automatically has it without redeclaring.
Shared behavior — showFuel() is implemented once. DieselEngine and ElectricEngine inherit it for free, while still being forced to provide their own start().

Car still depends on the abstraction (Motor), not the concrete class, so the Dependency Inversion Principle is preserved.
When to pick which
Use an abstract class when your motors share real implementation you don't want to duplicate (fuel tracking, diagnostics, common lifecycle steps). Use an interface when you only need to guarantee a contract and want maximum flexibility — a class can implement many interfaces but extend only one abstract class. In modern Java, interfaces with default methods blur this line, but abstract classes are still the cleaner choice when constructors and instance state are part of the abstraction.Você disse: Compare with Inteface InjectionCompare with Inteface Injection
HIGH COUPLING
HARD TO TEST
OCP VIOLATION
LOW FLEXIBILITYAnd Abstract Class7:28 PMClaude respondeu: Comparison: Interface Injection vs Abstract ClassComparison: Interface Injection vs Abstract Class
Here's how both solutions address the four problems of the original tightly-coupled code:
The Original Problems
ProblemWhat it meansHigh CouplingCar directly instantiates DieselEngine with new. Changing the engine means rewriting Car.Hard to TestYou can't swap in a fake/mock engine. Tests must use the real DieselEngine.OCP ViolationOpen/Closed Principle broken — adding a new engine type forces you to modify Car instead of extending it.Low FlexibilityCar works with exactly one engine type. No runtime choice, no variation.
How Each Solution Solves Them
ProblemInterface Injection (Motor interface)Abstract Class (Motor abstract class)High Coupling✅ Solved. Car depends on Motor abstraction, not DieselEngine. Engine is injected via constructor.✅ Solved. Same mechanism — Car holds a Motor reference, concrete type is injected from outside.Hard to Test✅ Excellent. Create a MockMotor implements Motor in two lines, inject it, done. No inheritance baggage.⚠️ Solved but heavier. Your mock must extend Motor and call super(fuelType). Forced to deal with the parent's constructor and state even when testing.OCP Violation✅ Fully solved. Add HybridEngine implements Motor → Car untouched. Unlimited new types.✅ Solved. Add HybridEngine extends Motor → Car untouched. But each new type is locked into Motor's inheritance chain.Low Flexibility✅ Maximum. A class can implement many interfaces (Motor, Serializable, Diagnosable...).⚠️ Limited. Java allows only single inheritance. If ElectricEngine extends Motor, it can never extend anything else.
The Key Trade-Off
Both solutions fix coupling and OCP equally well — that's the win from depending on an abstraction plus dependency injection. The real difference shows up in the other two columns:
Interface Injection wins on flexibility and testability. It imposes zero structure on implementers — they just promise to fulfill a contract. Mocks are trivial. Classes stay free to inherit from whatever they need.
Abstract Class wins when you have genuine shared code. If every motor needs the same fuelType field, the same showFuel() method, the same constructor logic, the abstract class lets you write it once. With an interface, you'd either duplicate that code in every implementation or pull it into a helper class.
Rule of Thumb
Reach for an interface by default — it gives you everything DI promises with no constraints. Reach for an abstract class only when you catch yourself copy-pasting the same fields and methods across every implementation, and that shared code truly belongs to the abstraction itself. In modern Java, you can even combine both: an interface for the contract, plus an abstract base class implementing it for the shared bits — getting the best of both worlds.