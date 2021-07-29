package bilgem.intern.eventmanagementsystem.common.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.Objects;

@MappedSuperclass
@Getter

// Entity'lerin hepsinde ortak olan özellikleri burada tutarız.
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseEntity that = (BaseEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }



}
