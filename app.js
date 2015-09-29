
/////////////////////////////////////////////////////////////////////////
// App //////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var log = logger();

// First pull in the args we need
var args = getArgs();

// Make sure we have a usable set of args
if ( ! verifyArgs( args ) ) {
  log.error( ' \
    Must pass template path (-t/--templates) or app root (-a/--app) or path to \
    services, directives, controllers or filters (-s/--services, -d/--directives, \
    -c/--controllers, -f/--filters) \
  ' );
}


// Then perform operations depending on what args were passed

/////////////////////////////////////////////////////////////////////////
// Functions ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

/**
 * Retrieve all the args we care about.
 *
 * @return {Object} Return found args
 */
function getArgs () {
  var yargs = require( 'yargs' ).argv;
  var args  = {};

  args.templatePath   = yargs.templates || yargs.t;
  args.appPath        = yargs.app || yargs.a;
  args.directivePath  = yargs.directives || yargs.d;
  args.filterPath     = yargs.filters || yargs.f;
  args.servicePath    = yargs.services || yargs.s;
  args.controllerPath = yargs.controllers || yargs.c;

  // Filter args down to the usable ones
  Object.keys( args ).forEach( function ( key ) {
    if ( ! args[ key ] ) { delete args[ key ]; }
  });

  // Return whatever args were found
  return args;
}

/**
 * Verify there is a minimum set of args to continue.
 *
 * @param {Object} args Object of passed args
 *
 * @return {Boolean} Returns true if we're cool to proceed
 */
function verifyArgs ( args ) {
  if (
    ! args.templatePath &&
    ! ( args.appPath ||
        (
          args.directivePath ||
          args.filterPath ||
          args.servicePath ||
          args.controllerPath
        )
      )
  ) {
    // Welp.
    return false;
  }

  // If we got this far we're cool
  return true;
}

function templateCleanup ( templatePath ) {

}

function dependencyCleanup ( args ) {

}

/////////////////////////////////////////////////////////////////////////
// Logging //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

/**
 * Prepare formatted logging.  Takes care of multiline logging as well as
 * output colors and whatnot.
 *
 * @return {Object} Returns logger service
 */
function logger () {
  // Pretty colors!
  var colors = require( 'colors' );

  // Build out all of our logging methods
  var methods = {};

  /**
   * Issue a generic error message.
   *
   * @param {String} string Content of error message
   */
  methods.error = function ( string ) {
    console.error( methods.prepare( string ).bold.red );
  };

  /**
   * Issue a generic success message.
   *
   * @param {String} string Content of error message
   */
  methods.success = function ( string ) {
    console.info( methods.prepare( string ).green );
  };

  /**
   * Prepare string for output.  Will format a multiline string into something
   * that doesn't look like a mess (allows for creating much cleaner long log
   * output).
   *
   * @param {String} raw Raw string contents to prepare
   *
   * @return {String} Returns prepared output string
   */
  methods.prepare = function ( raw ) {
    return raw.trim().replace( /\s\s+/gi, ' ' );
  };

  return methods;
}
