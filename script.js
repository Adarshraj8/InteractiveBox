document.addEventListener('DOMContentLoaded', (event) => {
    const boxes = document.querySelectorAll('.box');
    const totalPrices = {
        'top': document.getElementById('total-price-top'),
        'middle': document.getElementById('total-price-middle'),
        'bottom': document.getElementById('total-price-bottom')
    };

    // Function to manage details within a single box
    function manageBoxDetails(box) {
        const options = box.querySelectorAll('.option');
        let currentlyOpenOption = null;

        // Function to toggle details when clicked
        function toggleDetails(e) {
            e.stopPropagation(); // Prevent event from bubbling up

            const option = e.target.closest('.option');
            if (option) {
                const detailsToToggle = option.querySelector('.details');
                if (detailsToToggle) {
                    // Close previously open option if any within this box
                    if (currentlyOpenOption && currentlyOpenOption !== detailsToToggle) {
                        currentlyOpenOption.style.display = 'none';
                    }

                    // Toggle visibility of the clicked option's details
                    detailsToToggle.style.display = detailsToToggle.style.display === 'block' ? 'none' : 'block';
                    currentlyOpenOption = detailsToToggle.style.display === 'block' ? detailsToToggle : null;
                    
                    // Update total price
                    const boxId = box.id;
                    const price = option.querySelector('.price').textContent;
                    totalPrices[boxId.replace('box', '').toLowerCase()].textContent = price;
                }
            }
        }

        // Adding click event to each option within this box to toggle details
        options.forEach(option => {
            option.addEventListener('click', toggleDetails);
        });

        // Prevent closing when interacting with form elements inside details
        box.querySelectorAll('.details select').forEach(select => {
            select.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });

        // Close details when clicking outside the option within this box
        box.addEventListener('click', function(e) {
            if (currentlyOpenOption && !currentlyOpenOption.contains(e.target) && !currentlyOpenOption.closest('.option').contains(e.target)) {
                currentlyOpenOption.style.display = 'none';
                currentlyOpenOption = null;
            }
        });
    }

    // Apply the management function to each box
    boxes.forEach(box => {
        manageBoxDetails(box);
    });
});