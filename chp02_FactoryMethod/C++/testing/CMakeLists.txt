# Minimum required CMake version
cmake_minimum_required(VERSION 3.10)


# Project name
project(PaymentGatewayTests)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)
set(CMAKE_OSX_ARCHITECTURES arm64)

# Main executable
add_executable(PaymentGateway main.cpp payment_gateway.cpp)

# Add test executable
add_executable(PaymentGatewayTests payment_gateway_test.cpp payment_gateway.cpp)

# Link Google Test and pthread to the test executable
target_link_libraries(PaymentGatewayTests GTest::GTest GTest::Main pthread)

# Add Google Test
find_package(GTest REQUIRED)
include_directories(${GTEST_INCLUDE_DIRS})
