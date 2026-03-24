package com.employee;

import com.employee.config.AppConfig;
import com.employee.service.EmployeeService;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {
    public static void main(String[] args) {
        // Demonstrate using BeanFactory to manage beans
        // AnnotationConfigApplicationContext implements BeanFactory
        BeanFactory factory = new AnnotationConfigApplicationContext(AppConfig.class);

        // Retrieve the EmployeeService bean
        EmployeeService employeeService = factory.getBean(EmployeeService.class);

        System.out.println("--- Adding Employees ---");
        employeeService.addEmployee(101, "Alice Smith", "Engineering");
        employeeService.addEmployee(102, "Bob Johnson", "Marketing");
        employeeService.addEmployee(103, "Charlie Davis", "Sales");

        System.out.println("\n--- Displaying All Employees ---");
        employeeService.displayAllEmployees();
        
        System.out.println("\n--- Finding Employee by ID ---");
        employeeService.displayEmployeeById(102);
        
        System.out.println("\n--- Finding Non-Existent Employee ---");
        employeeService.displayEmployeeById(999);
    }
}
