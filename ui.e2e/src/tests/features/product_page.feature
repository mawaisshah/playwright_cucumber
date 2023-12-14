@swagLabsProducts
Feature: Products

  Scenario Outline: Verify the arrangement of products using various sorting criteria
    Given a product page
    When the user clicks on "<sorting>"
    Then the products should be displayed in "<sorting>" order

    Examples: 
      | sorting             |
      | Name (Z to A)       |
      | Price (low to high) |
      | Price (high to low) |
      | Name (A to Z)       |

  Scenario: Verify the user is able to add product to the cart
    Given a product page
    When the user clicks "Add to cart"
    Then the product should be successfully added to the cart

  Scenario: Verify the user is able to remove the product from the cart
    Given a product page
    When the user clicks "Add to cart"
    And clicks the "Remove"
    Then the product should be successfully removed from the cart

  Scenario: Verify the user is able to checkout the product in the cart
    Given a product page
    When the user clicks "Add to cart"
    And proceed to checkout with the selected product
    Then the product should be successfully checked out
