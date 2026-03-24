package com.employee.controller;

import com.employee.model.Employee;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/employee")
public class EmployeeController {

    // Simulating fetching employee data from a DB or Service
    @GetMapping("/details")
    public String showEmployeeDetails(Model model) {
        // Create an employee object to pass to the view
        Employee emp = new Employee(1001, "Jane Doe", "Information Technology", 85000.00);
        
        // Add it to the model to make it available to the JSP
        model.addAttribute("employee", emp);
        
        // Return view name which resolves to /WEB-INF/views/employee.jsp
        return "employee";
    }
}
