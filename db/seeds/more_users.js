
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return Promise.all([
      // Inserts seed entries
      knex('users').insert({id: 4, name: 'Viccy', email: 'viccy@viccy.com', password: 'test', avatar: 'https://openclipart.org/detail/277089/female-avatar-5'}),
      knex('users').insert({id: 5, name: 'Lijing', email: 'lijing@lijing.com', password: 'test', avatar: 'http://maxpixel.freegreatpicture.com/Redhead-Girl-Person-People-Woman-Female-Avatar-995164'}),
      knex('users').insert({id: 6, name: 'Spencer', email: 'spencer@spencer.com', password: 'test', avatar: 'http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-16.jpg'})
    ]);
};
