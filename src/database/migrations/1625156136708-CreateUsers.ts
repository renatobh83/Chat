import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1625156136708 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name:"users",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true
                    },
                    {
                        name:"email",
                        type:"string",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                      },
                ]
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
