# 23-Software-Design-Patterns-Every-Programmer-Should-Know
23 Software Design Patterns Every Programmer Should Know, Published by Packt

# Setting up your development environment

## C++

**Setting up C++ Locally**
==========================

To write and run C++ code locally, you'll need to set up a few tools on your computer. Here's a step-by-step guide:

### Install a C++ Compiler

A C++ compiler is necessary to translate your C++ code into machine code that your computer can execute. There are several compilers available, but here are a few popular ones:

* **GCC (GNU Compiler Collection)**: Available for Windows, macOS, and Linux.
* **Clang**: Available for Windows, macOS, and Linux.
* **Microsoft Visual Studio**: Available for Windows.

For this example, we'll use GCC.

#### Installing GCC on Windows

1. Download the MinGW installer from the official website: <https://www.mingw.org/>
2. Run the installer and follow the prompts to install MinGW.
3. Add the MinGW `bin` directory to your system's PATH environment variable.

#### Installing GCC on macOS (using Homebrew)

1. Install Homebrew if you haven't already: <https://brew.sh/>
1.1. Install C++ Std library as well (brew install libstdc++)
2. Run the following command in your terminal: `brew install gcc`

#### Installing GCC on Linux

GCC is usually pre-installed on Linux distributions. If it's not installed, you can use your distribution's package manager to install it. For example, on Ubuntu or Debian, you can run: `sudo apt-get install gcc`

### Install a Text Editor or IDE

A text editor or Integrated Development Environment (IDE) is where you'll write your C++ code. Some popular choices include:

* **Visual Studio Code**: A lightweight, open-source code editor with C++ support.
* **Sublime Text**: A feature-rich, commercial text editor with C++ support.
* **CLion**: A commercial IDE specifically designed for C++ development.

For this example, we'll use Visual Studio Code.

#### Installing Visual Studio Code

1. Download the Visual Studio Code installer from the official website: <https://code.visualstudio.com/>
2. Run the installer and follow the prompts to install Visual Studio Code.

### Write and Run Your First C++ Program

Now that you have a C++ compiler and a text editor or IDE, let's write and run a simple C++ program.

Create a new file called `hello.cpp` and add the following code:
```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```
Save the file and navigate to the directory containing the file in your terminal or command prompt.

Compile the program using the following command:
```bash
gcc -lstdc++ hello.cpp -o hello.o
```
This will create an executable file called `hello` in the same directory.

Run the program using the following command:
```bash
./hello
```
You should see the output:
```
Hello, World!
```
Congratulations! You've successfully set up C++ locally and written and run your first C++ program.

### Additional Tips and Resources

* Use a code formatter like `clang-format` to keep your code organized and readable.
* Learn about C++ best practices and coding standards.
* Explore online resources like tutorials, documentation, and forums to improve your C++ skills.
* Consider using a build system like `cmake` or `meson` to manage larger projects.

**Running C++ online**
==========================

Sites like the following can be used, if you want to run the code quickly and have no need to run locally:
https://onecompiler.com/cpp

### Kotlin

**Setting up Kotlin Locally**
==========================

To set up a Kotlin development environment locally, you can follow these steps:

**Step 1: Install JDK**

Kotlin requires the Java Development Kit (JDK) to be installed on your system. You can download and install the JDK from the official Oracle website.

**Step 2: Install IntelliJ IDEA or Android Studio**

IntelliJ IDEA and Android Studio are popular integrated development environments (IDEs) that support Kotlin development. You can download and install either of these IDEs from their official websites.

**Step 3: Install the Kotlin Plugin**

Once you have installed IntelliJ IDEA or Android Studio, you need to install the Kotlin plugin. The plugin provides syntax highlighting, code completion, and other features that make it easier to develop Kotlin applications.

**Step 4: Create a New Kotlin Project**

After installing the Kotlin plugin, create a new Kotlin project in IntelliJ IDEA or Android Studio. Choose the "Kotlin" option when creating the project, and select the desired project template.

**Step 5: Write Your First Kotlin Program**

Create a new Kotlin file in your project and write your first Kotlin program. You can start with a simple "Hello, World!" program:
```kotlin
fun main() {
    println("Hello, World!")
}
```
Run the program using the "Run" button or by pressing Shift+F10. You should see the output "Hello, World!" in the console.

That's it! You've successfully set up a Kotlin development environment and written your first Kotlin program.

**Run Kotlin in terminal**
==========================

You can run Kotlin code in the Mac command prompt using the `kotlinc` compiler and the `java` runtime.

Here are the steps:

1. Install the Kotlin compiler:
```bash
brew install kotlin
```
2. Create a new Kotlin file (e.g., `hello.kt`) with the following content:
```kotlin
fun main() {
    println("Hello, World!")
}
```
3. Compile the Kotlin file using the `kotlinc` compiler:
```bash
kotlinc hello.kt -include-runtime -d hello.jar
```
This will compile the Kotlin file and create a JAR file named `hello.jar`.

4. Run the JAR file using the `java` command:
```bash
java -jar hello.jar
```
This should print "Hello, World!" to the console.

Note: Make sure you have the JDK installed on your system and that the `java` and `kotlinc` commands are available in your terminal.

**Running Kotlin online**
==========================

Sites like the following can be used, if you want to run the code quickly and have no need to run locally:
https://onecompiler.com/kotlin


### Python

### Swift

### TypeScript

