;(function($, leaf, document) {
  var pages,            //Array of all Pages
  currentpage,          // current visiblePage ID
  debugmode = 1,
  /*
  Events
  */
  events = {
    init    : 'leaf.init',
    paging  : 'leaf.paging'
  },

  options = {},

  $doc = $(document),

  /*
  Internal Functions
  */
  setLeafContents =function(){
    
  },
  
  
 
  onLoadPagesJSON = function( _data ){
    if (debugmode) console.log( 'onLoadPages')
  },

  /*
  Public Methods in Leaf Namespace
  */
  
  methods = {
   init : function( _json ){
     if (debugmode) console.log("init")
     pages = [];
     $.getJSON( _json, function(data) { console.log( "loadjsons")});
   },
   
   go : function( pageid){
     	if (typeof pageid != 'number' || pageid < 0 || pageid >= pages.length) return;

 			$doc.trigger(events.paging, [currentpage, pageid]);
 			currentpage = pageid;
 			//updateStates();
   },
   
   next : function(){
     if (debugmode) console.log("next");
     methods.go( currentpage + 1);
   },
   
   prev : function(){
     if (debugmode) console.log("prev")
     go( currentpage -1 )
   },
   
   loadPages : function( _json, pageid ){
     var start = ( pageid ) ? pageid : 0;
     
   }, 
   
   
   	/*
		jQuery.leaf('extend', name, method)
		
		name: string
		method: function
		
		Adds method to the leaf namespace with the key of name. This doesn’t
		give access to any private member data — public methods must still be
		used within method — but lets extension authors piggyback on the deck
		namespace rather than pollute jQuery.
		
		$.leaf('extend', 'alert', function(msg) {
		   alert(msg);
		});

		// Alerts 'boom'
		$.deck('alert', 'boom');
		*/
		extend: function(name, method) {
			methods[name] = method;
		} 
  };
  
  /*
  check if LeafClass is in Class
  */
  $[leaf] = function(method, arg) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else {
			return methods.init(method, arg);
		}
	};
	
	$[leaf].defaults = {
		classes: {
			after: 'deck-after',
			before: 'deck-before',
			childCurrent: 'deck-child-current',
			current: 'deck-current',
			next: 'deck-next',
			onPrefix: 'on-slide-',
			previous: 'deck-previous'
		},
		
		selectors: {
			container: '.deck-container'
		},
		
		keys: {
			next: 39, // right arrow key
			previous: 37 // left arrow key
		}
	};

})(jQuery, 'leaf', document);