document.addEventListener('DOMContentLoaded', function() {
    // Get all option cards and radio buttons
    const optionCards = document.querySelectorAll('.option-card');
    const radioButtons = document.querySelectorAll('input[name="unit-option"]');
    const totalPriceElement = document.getElementById('total-price');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    // Function to update selected card
    function updateSelectedCard(selectedValue) {
        // Remove selected class from all cards
        optionCards.forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selected class to the chosen card
        const selectedCard = document.querySelector(`.option-card[data-units="${selectedValue}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            
            // Update total price
            const price = selectedCard.getAttribute('data-price');
            totalPriceElement.textContent = `$${price} USD`;
        }
    }
    
    // Add click event to radio buttons
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                updateSelectedCard(this.value);
            }
        });
    });
    
    // Add click event to option cards
    optionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only select the card if the click wasn't on a dropdown or other interactive element
            if (
                !e.target.classList.contains('dropdown') && 
                !e.target.closest('.dropdown-container')
            ) {
                const unitValue = this.getAttribute('data-units');
                const radioButton = document.querySelector(`input[name="unit-option"][value="${unitValue}"]`);
                
                if (radioButton) {
                    radioButton.checked = true;
                    updateSelectedCard(unitValue);
                }
            }
        });
    });
    
    // Add to cart button animation
    addToCartBtn.addEventListener('click', function() {
        // Add a temporary class for animation
        this.classList.add('clicked');
        
        // Get the selected option
        const selectedRadio = document.querySelector('input[name="unit-option"]:checked');
        const units = selectedRadio ? selectedRadio.value : '2'; // Default to 2 if nothing is selected
        
        // Get variant selections for option 2 (if selected)
        let variantInfo = '';
        if (units === '2') {
            const size1 = document.querySelector('select[name="size-1"]').value;
            const color1 = document.querySelector('select[name="color-1"]').value;
            const size2 = document.querySelector('select[name="size-2"]').value;
            const color2 = document.querySelector('select[name="color-2"]').value;
            
            variantInfo = `
                Unit 1: Size ${size1}, Color ${color1}
                Unit 2: Size ${size2}, Color ${color2}
            `;
        }
        
        // Get the price
        const selectedCard = document.querySelector(`.option-card[data-units="${units}"]`);
        const price = selectedCard ? selectedCard.getAttribute('data-price') : '18.00';
        
        // Show an alert with the order details
        alert(`Added to cart:
            ${units} unit(s)
            Total: $${price} USD
            ${variantInfo}
        `);
        
        // Remove the class after animation completes
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
    });
    
    // Set initial state - Option 2 should be selected by default
    const defaultOption = document.querySelector('input[name="unit-option"][value="2"]');
    if (defaultOption) {
        defaultOption.checked = true;
        updateSelectedCard('2');
    }
});
