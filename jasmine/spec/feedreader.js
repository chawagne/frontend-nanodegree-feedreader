/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('contains URLs', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });


    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */

    it('has a name', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });
  });


  /* TODO: Write a new test suite named "The menu" */
  describe('The menu', function() {
    //Store the body as menu so classes can be changed
    let menu = document.getElementsByTagName('body');
    //Store the hamburger icon so it can be clicked
    let menuIcon = document.getElementsByClassName('menu-icon-link');

    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('hides the menu by default', function() {
      expect(menu[0].classList.value).toBe('menu-hidden');
    });

    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('toggles the menu when clicked', function() {
      //shows menu
      menuIcon[0].click();
      expect(menu[0].classList.value).toBe('');
      //hides menu
      menuIcon[0].click();
      expect(menu[0].classList.value).toBe('menu-hidden');
    });
  });

  /* TODO: Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('feeds are loaded', function(done) {
      //Checks that an entry element exists and is a decendent of an element with the class 'feed'
      expect(document.getElementsByClassName('entry')[0].parentElement.parentElement.classList.value).toBe('feed');
      done();
    });
  });

  /* TODO: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    let firstEntry = '';

    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */

    //loadFeed is called twice so the results can be compared.
    beforeEach(function(done) {
      loadFeed(0, function() {
        //Stores the first entry of the feed to be comapred against later.
        firstEntry = document.getElementsByClassName('entry')[0].children[0].innerHTML;
        loadFeed(1, function() {
          done();
        });
      });
    });

    it('loads new feeds after changing', function(done) {
      //Checks to make sure the first entry has a different name after changing feeds.
      expect(document.getElementsByClassName('entry')[0].children[0].innerHTML).not.toBe(firstEntry);
      done();
    });
  });
});
