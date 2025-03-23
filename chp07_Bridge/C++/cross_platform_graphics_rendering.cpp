#include <iostream>
#include <memory>
#include <string>

// Step 1: Implementor interface
class Renderer {
public:
    virtual void renderCircle(float radius) = 0;
    virtual void renderSquare(float side) = 0;
    virtual ~Renderer() = default;
};

// Step 2: Concrete Implementors
class OpenGLRenderer : public Renderer {
public:
    void renderCircle(float radius) override {
        std::cout << "Rendering circle with radius " << radius << " using OpenGL." << std::endl;
    }
    void renderSquare(float side) override {
        std::cout << "Rendering square with side " << side << " using OpenGL." << std::endl;
    }
};

class DirectXRenderer : public Renderer {
public:
    void renderCircle(float radius) override {
        std::cout << "Rendering circle with radius " << radius << " using DirectX." << std::endl;
    }
    void renderSquare(float side) override {
        std::cout << "Rendering square with side " << side << " using DirectX." << std::endl;
    }
};

// Step 3: Abstraction
class Shape {
protected:
    std::shared_ptr<Renderer> renderer;
public:
    Shape(std::shared_ptr<Renderer> renderer) : renderer(renderer) {}
    virtual void draw() = 0;
    virtual ~Shape() = default;
};

// Step 4: Refined Abstractions
class Circle : public Shape {
private:
    float radius;
public:
    Circle(std::shared_ptr<Renderer> renderer, float radius)
        : Shape(renderer), radius(radius) {}
    void draw() override {
        renderer->renderCircle(radius);
    }
};

class Square : public Shape {
private:
    float side;
public:
    Square(std::shared_ptr<Renderer> renderer, float side)
        : Shape(renderer), side(side) {}
    void draw() override {
        renderer->renderSquare(side);
    }
};

// Step 5 & 6: Client code
int main() {
    std::shared_ptr<Renderer> opengl = std::make_shared<OpenGLRenderer>();
    std::shared_ptr<Renderer> directx = std::make_shared<DirectXRenderer>();

    Circle circleOpenGL(opengl, 5.0f);
    Square squareDirectX(directx, 4.0f);

    circleOpenGL.draw();
    squareDirectX.draw();

    return 0;
}