package com.employee.service;

import com.employee.model.Employee;
import com.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public void addEmployee(int id, String name, String department) {
        Employee emp = new Employee(id, name, department);
        employeeRepository.save(emp);
        System.out.println("Employee Added: " + emp.getName());
    }

    public void displayAllEmployees() {
        List<Employee> all = employeeRepository.findAll();
        System.out.println("--- All Employees ---");
        for (Employee e : all) {
            System.out.println(e);
        }
    }
    
    public void displayEmployeeById(int id) {
        Employee emp = employeeRepository.findById(id);
        if (emp != null) {
            System.out.println("Employee Found: " + emp);
        } else {
            System.out.println("Employee Request with ID " + id + " was not found.");
        }
    }
}
