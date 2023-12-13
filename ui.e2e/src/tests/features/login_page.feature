@swagLabsLogin
Feature: Login

  Scenario Outline: Verify the login functionality using different credentials
    Given a login page
    When user enters "<email>" and "<password>"
    Then the login "<result>" message should be displayed

    Examples: 
      | email         | password     | result                                                                    |
      | standard_user | asdf         | Epic sadface: Username and password do not match any user in this service |
      | asdf          | secret_sauce | Epic sadface: Username and password do not match any user in this service |
      | asdf          | xxxx         | Epic sadface: Username and password do not match any user in this service |
      | standard_user | secret_sauce | Products                                                                  |
