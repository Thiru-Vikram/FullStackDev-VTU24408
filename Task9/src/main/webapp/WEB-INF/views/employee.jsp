<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<html>
<head>
    <title>Employee Details</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #fce4ec; padding: 20px; }
        .card { background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px; max-width: 400px; margin: 0 auto; }
        h2 { color: #d81b60; text-align: center; }
        .details-row { margin: 10px 0; font-size: 16px; }
        .label { font-weight: bold; color: #555; display: inline-block; width: 120px; }
    </style>
</head>
<body>

<div class="card">
    <h2>Employee Profile</h2>
    
    <div class="details-row">
        <span class="label">ID:</span>
        <span>${employee.id}</span>
    </div>
    
    <div class="details-row">
        <span class="label">Name:</span>
        <span>${employee.name}</span>
    </div>
    
    <div class="details-row">
        <span class="label">Department:</span>
        <span>${employee.department}</span>
    </div>
    
    <div class="details-row">
        <span class="label">Salary:</span>
        <span>$${employee.salary}</span>
    </div>
</div>

</body>
</html>
