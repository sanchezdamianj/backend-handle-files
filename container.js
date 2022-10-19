const fs = require("fs");

class Container {
  constructor(fileName) {
    this.fileName = fileName;
    this.objects = this.readData(this.fileName) || [];
  }

  async generateId() {
    try {
      this.objects = (await this.getAll()) || [];
      let maxId = this.objects.length;
      this.objects.forEach((el) => {
        el.id > maxId ? (maxId = el.id) : maxId;
      });
      return maxId + 1;
    } catch (err) {
      throw new Error(`id can not be created ${err.message}`);
    }
  }

  async save(obj) {
    try {
      const readFile = await this.getAll();
      if (!readFile) {
        obj.id = await this.generateId();
        this.objects.push(obj);
        this.writeData(this.objects);
        return obj.id;
      } else {
        this.objects = readFile;
        obj.id = await this.generateId();
        this.objects.push(obj);
        this.writeData(this.objects);
        return obj.id;
      }
    } catch (err) {
      throw new Error(`Error when saving file ${err.message}`);
    }
  }

  async getById(id) {
    try {
      this.objects = await this.getAll();
      const obj = this.objects.find((el) => el.id === Number(id));
      return obj ? obj : null;
    } catch (err) {
      throw new Error(`files with this id not found ${err.message}`);
    }
  }

  async getAll() {
    try {
      const data = await this.readData(this.fileName);
      return data;
    } catch (err) {
      throw new Error(`files could not be loaded ${err.message}`);
    }
  }

  async deleteById(id) {
    try {
      this.objects = await this.getAll();
      this.objects = this.objects.filter((el) => el.id != Number(id));
      this.writeData(this.objects);
    } catch (err) {
      throw new Error(`file could not be deteled ${err.message}`);
    }
  }

  async deleteAll() {
    try {
      this.objects = await this.getAll();
      this.objects = [];
      this.writeData(this.objects);
    } catch (err) {
      throw new Error(`files could not be deteled ${err.message}`);
    }
  }
  readData(path) {
    try {
      const data = JSON.parse(fs.readFileSync(path, "utf-8"));
      return data;
    } catch (err) {
      throw new Error(`File could not be read ${err.message}}`);
    }
  }
  writeData(objects) {
    try {
      fs.writeFileSync(this.fileName, JSON.stringify(objects, null, 2));
    } catch (err) {
      throw new Error(`could not edit the file, ${err.message}`);
    }
  }
}

module.exports = Container;
