terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-north-1"
}

# =====================
# ec2_1
# =====================
resource "aws_security_group" "ec2_1_http_n_ssh_sg" {
  name        = "ec2_1_http_n_ssh_sg_http_and_ssh"
  description = "ec2_1 default sg"
  tags = {
    Name = "ec2_1_http_n_ssh_sg"
  }
}
resource "aws_vpc_security_group_ingress_rule" "ec2_1_http_n_ssh_sg_in1" {
  security_group_id = aws_security_group.ec2_1_http_n_ssh_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  to_port           = 80
  ip_protocol       = "tcp"
}
resource "aws_vpc_security_group_ingress_rule" "ec2_1_http_n_ssh_sg_in2" {
  security_group_id = aws_security_group.ec2_1_http_n_ssh_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  to_port           = 22
  ip_protocol       = "tcp"
}
resource "aws_vpc_security_group_egress_rule" "ec2_1_http_n_ssh_sg_eg1" {
  security_group_id = aws_security_group.ec2_1_http_n_ssh_sg.id
  ip_protocol       = "-1"
  cidr_ipv4         = "0.0.0.0/0"
}

resource "aws_security_group" "ec2_1_rds_sg" {
  name        = "ec2_1_rds_sg"
  description = "ec2_1 rds sg"
  tags = {
    Name = "ec2_1_rds_sg"
  }
}
resource "aws_vpc_security_group_egress_rule" "ec2_1_rds_sg_eg1" {
  security_group_id            = aws_security_group.ec2_1_rds_sg.id
  referenced_security_group_id = aws_security_group.rds_ec2_1_sg.id
  from_port                    = 5432
  to_port                      = 5432
  ip_protocol                  = "tcp"
}

resource "aws_key_pair" "ec2_1_kp" {
  key_name   = "ec2_1_key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCJiqPVlJNaay0oYe+shlGhHqJl3yy3KAwTbPZO6aFT2+AhitWlmfwiFeL3JKS7Aw4CFiJUrTF6tSP+v6z5jo/2xgGfNVRtpdiF6TuWR69Q0hQhjMnp1R02X29WL1zfOmZQLlCxejuNS7dps/8gM9YByLw8A4w61Kw5mYzaJXb5HUyjikSxxGDyZMO6xgKc7usW9XTXGbOZL+M9khqZKeyMw2xjdsN+XFFkxevfBsoNxkDUmJ5WpHdfDieFUzVIAYNYtM4RnS1ALXBZ09Ir7OgdN1vy11hlHcbPa86IKu55BPCYmGc56HrI3IWlkKd9HQyExM0zYn82AdLtpL2H7yux"
}

resource "aws_instance" "ec2_1_instance" {
  ami                    = "ami-0014ce3e52359afbd"
  instance_type          = "t3.micro"
  key_name               = "ec2_1_key"
  vpc_security_group_ids = [aws_security_group.ec2_1_http_n_ssh_sg.id, aws_security_group.ec2_1_rds_sg.id]

  tags = {
    Name = "ec2_1Instance"
  }
}

# ================== 
# rds
# ================== 
resource "aws_security_group" "rds_ec2_1_sg" {
  name        = "rds_ec2_1_sg"
  description = "rds ec2_1 sg"
  tags = {
    Name = "rds_ec2_1_sg"
  }
}
resource "aws_vpc_security_group_ingress_rule" "rds_ec2_1_sg_in1" {
  security_group_id            = aws_security_group.rds_ec2_1_sg.id
  referenced_security_group_id = aws_security_group.ec2_1_rds_sg.id
  from_port                    = 5432
  to_port                      = 5432
  ip_protocol                  = "tcp"
}
