---
created: 2026-08-18 11:47
updated: 2026-08-18 11:47
---
# gofakes3

[johannesboyne/gofakes3](https://github.com/johannesboyne/gofakes3) は、[[aws-s3-files|AWS S3]] 互換のAPIをローカルで模倣するGo製のフェイクサーバー。AWS S3に依存するコードのテスト・ローカル開発用途に使う。ライセンスはMIT。

## 何をするツールか

実際のAWS環境やMinIOのようなS3互換ストレージを別途用意しなくても、Go側の`httptest.NewServer`でインプロセスにS3互換エンドポイントを起動できる。AWS SDK for Go v2から通常のS3クライアントとして接続し、バケット作成・オブジェクトのPUT/GETなど一連のS3操作をテストできる。

```go
backend := s3mem.New()
faker := gofakes3.New(backend)
ts := httptest.NewServer(faker.Server())
defer ts.Close()

client := s3.NewFromConfig(cfg, func(o *s3.Options) {
    o.UsePathStyle = true
})

_, err := client.CreateBucket(context.TODO(),
    &s3.CreateBucketInput{Bucket: aws.String("newbucket")})

_, err = client.PutObject(context.TODO(),
    &s3.PutObjectInput{
        Body:   strings.NewReader("test data"),
        Bucket: aws.String("newbucket"),
        Key:    aws.String("test.txt"),
    })
```

`s3mem.New()`のようにストレージバックエンドを差し替えられる仕組みになっており、インメモリ以外の実装（`s3afero`など）も存在する。

## 起動方法

- Go言語のテストコード内にライブラリとして組み込む（上記の例）。
- Dockerイメージ`johannesboyne/gofakes3`をpullしてスタンドアロンサーバーとして起動することも可能。

## 接続方式

- **パススタイル**（推奨）: `http://localhost:9000/mybucket/myobject`
- **仮想ホストスタイル**: `http://mybucket.localhost:9000/myobject`

## 制限事項

- READMEには「significant portions of the AWS S3 API yet to be implemented」とあり、S3 APIの一部は未実装。
- 開発・テスト用途に特化しており、本番環境での永続的なデータ保管には非推奨。

## 出典

- [johannesboyne/gofakes3 - GitHub](https://github.com/johannesboyne/gofakes3)

#go #testing #s3
