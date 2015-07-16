$(document).ready(function() {
	//ALL CODE GOES IN HERE});
	//make new task form hiddent when doc loads//
	$('#newTaskForm').hide();
	//store list in array//
	var listo = [];
	//store task objects not just strings in array//
	var Task = function(task) {
		this.task = task;
		this.id = 'new';
	}	
	//create object to push it into array//	
	//add fade toggle so new button will hide and show input form at same time//
	var addTask = function(task) {
		if(task) {
			task = new Task(task);
			listo.push(task);

			$('#newItemInput').val('');

			$('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');

		}
		$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
	};
	//call a jQuery event that calls the addTask function when we click the saveNewItem button.//
	$('#saveNewItem').on('click', function (e) {
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);
    });
    //open and close the new task form with the newListItem and Cancel button.
    //Opens form
    $('#newListItem').on('click', function () {
        $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
    });
    //closes form
    $('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
    });
    //make a function that allows us to change status of item from 'new' to 'inProgress'
	var advanceTask = function(task) {
    var modified = task.innerText.trim()
     for (var i = 0; i < listo.length; i++) {
       if (listo[i].task === modified) {
           if (listo[i].id === 'new') {
               listo[i].id = 'inProgress';
           } else if (listo[i].id === 'inProgress') {
               listo[i].id = 'archived';
           } else {
               listo.splice(i, 1);
           }
           break;
       }
   }
   task.remove();
	};
    //set a variable to access 'this' to pass into another function//
	//provide ability to move the actual list item// 
	$(document).on('click', '#item', function(e) {
		e.preventDefault();
        var task = this;		
        advanceTask(task);
        this.id = 'inProgress';
        $('#currentList').append(this.outerHTML);
	}); 
	//move items from 'inProgress' to 'archived':
	$(document).on('click', '#inProgress', function (e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
    });
    //create a way to delete the items on the list//
    $(document).on('click', '#archived', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
    });

	})