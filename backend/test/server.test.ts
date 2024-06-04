import {apiServer} from '../server';

describe('api', () => {
  let server;
  beforeAll(async () => {
    console.log('Jest - beforeAll()');
    server = await apiServer();
  });

  describe('Get artists data from server', () => {
    it('should return a 200', async () => {
      const response = await fetch('http://localhost:8080/api/search/jack+johnson/1?limit=1');
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
    });

    it('search jack johnson and should match artist id', async () => {
      const response = await fetch('http://localhost:8080/api/search/jack+johnson/1?limit=1');
      const data = await response.json();
      expect((data?.data || []).map((a) => a.artistId)).toContain(909253);
    });

    it('should return a 404', async () => {
      const response = await fetch('http://localhost:8080/api/search//1');
      expect(response.ok).toBe(false);
    });
  })

  describe('Get albums data from server', () => {
    it('should return a 200', async () => {
      const response = await fetch('http://localhost:8080/api/albums/909253');
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
    });

    it('search jack johnson albums id', async () => {
      const response = await fetch('http://localhost:8080/api/albums/909253');
      const data = await response.json();
      expect(data?.data?.artistName).toBe("Jack Johnson");
      expect((data?.data?.albums || []).map((a) => a.albumId)).toContain(906900960);
    });

    it('should return a 404', async () => {
      const response = await fetch('http://localhost:8080/api/albums/');
      expect(response.ok).toBe(false);
    });
  })

  afterAll(async () => {
    console.log('Jest - afterAll()');
    await server.close();
  });
});

// test("Get artists data from server", () => {
//   //expect(2).toEqual(2);
// });
