function closeOpenForm() {
    var me = {};
    var form = document.querySelector('.form-container');
    var openButton = null;

    // initialization
    var closeButton = document.querySelector('.form__close-button');
    closeButton.addEventListener('click', onClose);


    function onOpen() {
        me.open();

        // remove Listener by opening the form
        openButton.removeEventListener('click', onOpen);


    }

    function onClose() {
        me.close();

        // remove Listener by closing the form
        closeButton.removeEventListener('click', onClose);

    }




    me.open = function() {
        // open form
        form.classList.remove('is-hidden');

        // add listener to close button
        closeButton = document.querySelector('.form__close-button');
        closeButton.addEventListener('click', onClose);

    };

    me.close = function() {
        //close form
        form.classList.add('is-hidden');

        // add listener to open button
        openButton = document.querySelector('.arrow-down');
        openButton.addEventListener('click', onOpen);

    };

    window.form = me;

}