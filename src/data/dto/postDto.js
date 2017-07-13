class PostDto {
  constructor(srcJson) {
      this.by = srcJson.by,
      this.descendants = srcJson.descendants,
      this.id = srcJson.id,
      this.score = srcJson.score,
      this.time = srcJson.time,
      this.title = srcJson.title,
      this.type = srcJson.type,
      this.url = srcJson.url;
  }
}

export default PostDto;
