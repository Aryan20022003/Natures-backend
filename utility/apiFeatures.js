class API {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    find() {
      const { difficulty } = this.queryString;
      console.log({ difficulty });
      if (difficulty) {
        this.query = this.query.find({ difficulty });
      }
      return this;
    }
  
    sorting() {
      if (this.queryString.sort) {
        console.log(this.queryString.sort);
        let sortBy = JSON.stringify(this.queryString.sort).split(',').join(' ');
        sortBy = JSON.parse(sortBy);
        this.query = this.query.sort(sortBy);
      }
      return this;
    }
  
    fieldRequested() {
      if (this.queryString.select) {
        console.log(this.queryString.select);
        let toSelect = this.queryString.select.split(',').join(' ');
        this.query = this.query.select(toSelect);
      } else {
        this.query = this.query.select('-__v');
      }
      return this;
    }
  
    paging() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      this.query = this.query.limit(limit).skip((page - 1) * limit);
      return this;
    }
  }

module.exports=API;