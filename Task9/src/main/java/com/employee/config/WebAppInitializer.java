package com.employee.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        // Can be useful for services & data sources
        return new Class<?>[] { };
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        // Here we provide the Web Configuration class
        return new Class<?>[] { WebConfig.class };
    }

    @Override
    protected String[] getServletMappings() {
        // Simulates <url-pattern>/</url-pattern>
        return new String[] { "/" };
    }
}
